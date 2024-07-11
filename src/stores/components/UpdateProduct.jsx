// UpdateProduct.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Row, Col } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';

const UpdateProduct = ({ storeId, onUpdateSuccess, product_id }) => {
  const [data, setData] = useState({
    storeId: storeId,
    name: '',
    description: '',
    price: '',
    quantity_in_stock: '',
    status_id: '',
    promo_id: '',
    product_type_id: '',
    images: [],
  });

  const [imageFiles, setImageFiles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/get_product/${product_id}`);
        setData(response.data[0]);
        console.log("Existing product data:", response.data[0]);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchData();
  }, [product_id]);

  const handleImageChange = (e) => {
    setImageFiles(Array.from(e.target.files));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    imageFiles.forEach((file) => {
      formData.append('images', file);
    });

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    axios.put(`/updateProduct/${product_id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((res) => {
        console.log(res);
        if (onUpdateSuccess) {
          onUpdateSuccess();
        }
      })
      .catch((err) => {
        console.log("Error:", err);
        alert('Error updating product. Please check the console for more details.');
      });
  };

  // Add conditional rendering
  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="images">
        <Form.Label>รูป:</Form.Label>
        <Form.Control
          type="file"
          name="images"
          multiple
          onChange={handleImageChange}
        />

        {imageFiles.length > 0 ? (
          <div style={{ marginTop: '10px' }}>
            {imageFiles.map((file, index) => (
              <img
                key={index}
                src={URL.createObjectURL(file)}
                alt="Preview"
                style={{ maxWidth: '100px', maxHeight: '100px', margin: '10px' }}
              />
            ))}
          </div>
        ) : (
          data.images.map((image, index) => (
            <img
              key={index}
              src={`/productimages/${image}`}
              alt="Preview"
              style={{ maxWidth: '100px', maxHeight: '100px', marginTop: '10px' }}
            />
          ))
        )}
      </Form.Group>

      <Row>
        <Col>
          <Form.Group controlId="name">
            <Form.Label>ชื่อสินค้า:</Form.Label>
            <Form.Control
              value={data.name || ''}
              type="text"
              name="name"
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="description">
            <Form.Label>คำอธิบายสินค้า:</Form.Label>
            <Form.Control
              value={data.description || ''}
              type="text"
              name="description"
              onChange={(e) => setData({ ...data, description: e.target.value })}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form.Group controlId="price">
            <Form.Label>ราคา:</Form.Label>
            <Form.Control
              value={data.price || ''}
              type="text"
              name="price"
              onChange={(e) => setData({ ...data, price: e.target.value })}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="quantity_in_stock">
            <Form.Label>จำนวนในสต็อก:</Form.Label>
            <Form.Control
              value={data.quantity_in_stock || ''}
              type="text"
              name="quantity_in_stock"
              onChange={(e) => setData({ ...data, quantity_in_stock: e.target.value })}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form.Group controlId="status_id">
            <Form.Label>สถานะ:</Form.Label>
            <Form.Control
              value={data.status_id || ''}
              type="text"
              name="status_id"
              onChange={(e) => setData({ ...data, status_id: e.target.value })}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="promo_id">
            <Form.Label>โปรโมชั่น:</Form.Label>
            <Form.Control
              value={data.promo_id || ''}
              type="text"
              name="promo_id"
              onChange={(e) => setData({ ...data, promo_id: e.target.value })}
            />
          </Form.Group>
        </Col>
      </Row>

      <Form.Group controlId="product_type_id">
        <Form.Label>ประเภทสินค้า:</Form.Label>
        <Form.Control
          value={data.product_type_id || ''}
          type="text"
          name="product_type_id"
          onChange={(e) => setData({ ...data, product_type_id: e.target.value })}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        บันทึก
      </Button>
    </Form>
  );
};

export default UpdateProduct;
