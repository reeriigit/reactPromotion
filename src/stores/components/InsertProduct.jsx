import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Row, Col } from 'react-bootstrap';

const InsertProduct = ({ storeId, onInsertSuccess }) => {
  const [formData, setFormData] = useState({
    storeId: storeId,
    name: '',
    description: '',
    price: '',
    quantity_in_stock: '0',
    status_id: '1',
    promo_id: '',
    product_type_id: '',
    images: [],
  });

  const [productTypes, setProductTypes] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [statuses, setStatuses] = useState([]);

  // Fetch product types based on storeId
  useEffect(() => {
    const fetchProductTypes = async () => {
      try {
        const response = await axios.get(`/producttype/${storeId}`);
        setProductTypes(response.data);
      } catch (error) {
        console.error('Error fetching product types:', error);
      }
    };

    fetchProductTypes();
  }, [storeId]);

  // Fetch promotions based on storeId
  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const response = await axios.get(`/promotions/${storeId}`);
        setPromotions(response.data);
      } catch (error) {
        console.error('Error fetching promotions:', error);
      }
    };

    fetchPromotions();
  }, [storeId]);

  // Fetch statuses
  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const response = await axios.get('/statuses');
        setStatuses(response.data);
      } catch (error) {
        console.error('Error fetching statuses:', error);
      }
    };

    fetchStatuses();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      images: Array.from(e.target.files),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    for (const key in formData) {
      if (key === 'images') {
        formData[key].forEach((image) => {
          formDataToSend.append('images', image);
        });
      } else if (formData[key] !== '') { // Add only if not empty
        formDataToSend.append(key, formData[key]);
      }
    }

    // Debugging: Log formDataToSend keys and values
    for (let pair of formDataToSend.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }

    try {
      await axios.post('/insertProduct', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Call the callback function when the insert is successful
      if (onInsertSuccess) {
        onInsertSuccess();
      }
    } catch (error) {
      console.error('Error inserting product:', error);
      alert('Error inserting product. Please try again.');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId='images'>
        <Form.Label>รูป:</Form.Label>
        <Form.Control type='file' name='images' multiple onChange={handleImageChange} />
        {formData.images.length > 0 && (
          <div style={{ marginTop: '10px' }}>
            {formData.images.map((image, index) => (
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
            <Form.Label>ชื่อสินค้า:</Form.Label>
            <Form.Control type='text' name='name' value={formData.name} onChange={handleChange} />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId='description'>
            <Form.Label>คำอธิบายสินค้า:</Form.Label>
            <Form.Control type='text' name='description' value={formData.description} onChange={handleChange} />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form.Group controlId='price'>
            <Form.Label>ราคา:</Form.Label>
            <Form.Control type='text' name='price' value={formData.price} onChange={handleChange} />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId='quantity_in_stock'>
            <Form.Label>จำนวนในสต็อก:</Form.Label>
            <Form.Control type='text' name='quantity_in_stock' value={formData.quantity_in_stock} onChange={handleChange} />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form.Group controlId='status_id'>
            <Form.Label>สถานะ:</Form.Label>
            <Form.Select name='status_id' value={formData.status_id} onChange={handleChange}>
              {statuses.map((status) => (
                <option key={status.status_id} value={status.status_id}>
                  {status.name} {status.status_id}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form.Group controlId='promo_id'>
            <Form.Label>โปรโมชั่น:</Form.Label>
            <Form.Select name='promo_id' value={formData.promo_id} onChange={handleChange}>
              <>
              <option>จำเป็น</option>
              {promotions.map((promo) => (
                <option key={promo.promo_id} value={promo.promo_id}>
                  {promo.promo_name} {promo.promo_id}
                </option>
          
                
              ))}
              </>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Form.Group controlId='product_type_id'>
        <Form.Label>ประเภทสินค้า:</Form.Label>
        <Form.Select name='product_type_id' value={formData.product_type_id} onChange={handleChange}>
          <>
          <option>จำเป็น</option>
          {productTypes.map((type) => (
          <option key={type.product_type_id} value={type.product_type_id}>
            {type.product_type_name} {type.product_type_id}
          </option>
      
        ))}
          </>
        </Form.Select>
      </Form.Group>

      <Button variant='primary' type='submit'>
        บันทึก
      </Button>
    </Form>
  );
};

export default InsertProduct;
