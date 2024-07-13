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
    cost_price: '0',
    status_id: '1',
    product_type_id: '',
    images: [],
  });

  const [productTypes, setProductTypes] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [productImageFiles, setProductImageFiles] = useState([]);
  const [existingImages, setExistingImages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("roool fuck ", `${product_id}`)
        const productResponse = await axios.get(`/get_product/${product_id}`);
        const productData = productResponse.data[0];
        setData((prevData) => ({
          ...prevData,
          ...productData,
        }));
        setExistingImages(JSON.parse(productData.images || '[]'));

        const productTypeResponse = await axios.get(`/producttype/${storeId}`);
        setProductTypes(productTypeResponse.data);
        console.log("hello",productTypeResponse.data)

        const statusResponse = await axios.get('/statuses');
        setStatuses(statusResponse.data);

        console.log('Existing product data:', productData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [product_id, storeId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setProductImageFiles(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    productImageFiles.forEach((image) => {
      formDataToSend.append('images', image);
    });

    Object.entries(data).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    console.log('Data to be sent:', formDataToSend);

    try {
      const response = await axios.put(`/updateProduct/${product_id}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response);
      if (onUpdateSuccess) {
        onUpdateSuccess();
      }
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Error updating product. Please check the console for more details.');
    }
  };

  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId='images'>
        <Form.Label>Product Images:</Form.Label>
        <Form.Control type='file' name='images' multiple onChange={handleImageChange} />
        {existingImages.length > 0 && (
          <div style={{ marginTop: '10px' }}>
            {existingImages.map((image, index) => (
              <img
                key={index}
                src={`/productimages/${image}`}
                alt='Existing'
                style={{ maxWidth: '100px', maxHeight: '100px', margin: '10px' }}
              />
            ))}
          </div>
        )}
        {productImageFiles.length > 0 && (
          <div style={{ marginTop: '10px' }}>
            {productImageFiles.map((image, index) => (
              <img
                key={index}
                src={URL.createObjectURL(image)}
                alt='Preview'
                style={{ maxWidth: '100px', maxHeight: '100px', margin: '10px' }}
              />
            ))}
          </div>
        )}
      </Form.Group>

      <Row>
        <Col>
          <Form.Group controlId='name'>
            <Form.Label>Product Nameb: storeId{storeId}</Form.Label>
            <Form.Control
              type='text'
              name='name'
              value={data.name || ''}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId='description'>
            <Form.Label>Description:</Form.Label>
            <Form.Control
              type='text'
              name='description'
              value={data.description || ''}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form.Group controlId='price'>
            <Form.Label>Price:</Form.Label>
            <Form.Control
              type='text'
              name='price'
              value={data.price || ''}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId='cost_price'>
            <Form.Label>Cost Price:</Form.Label>
            <Form.Control
              type='text'
              name='cost_price'
              value={data.cost_price || ''}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form.Group controlId='status_id'>
            <Form.Label>Status:</Form.Label>
            <Form.Select
              name='status_id'
              value={data.status_id || ''}
              onChange={handleChange}
            >
              {statuses.map((status) => (
                <option key={status.status_id} value={status.status_id}>
                  {status.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Form.Group controlId='product_type_id'>
        <Form.Label>Product Type:</Form.Label>
        <Form.Select
          name='product_type_id'
          value={data.product_type_id || ''}
          onChange={handleChange}
        >
          <option>Select Product Type</option>
          {productTypes.map((type) => (
            <option key={type.product_type_id} value={type.product_type_id}>
              {type.product_type_name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Button variant='primary' type='submit'>
        Submit
      </Button>
    </Form>
  );
};

export default UpdateProduct;
