import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Row, Col } from 'react-bootstrap';

const InsertProductType = ({ storeId, onInsertSuccess }) => {
  const [formData, setFormData] = useState({
    storeId: storeId,
    product_type_name: '',
    description: '',
    product_type_image: null,
  });

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
      product_type_image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      await axios.post('/insertProductType', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Call the callback function when the insert is successful
      if (onInsertSuccess) {
        onInsertSuccess();
      }
    } catch (error) {
      console.error('Error inserting product type:', error);
      alert('Error inserting product type. Please try again.');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="product_type_image">
        <Form.Label>รูป:</Form.Label>
        <Form.Control type="file" name="product_type_image" onChange={handleImageChange} />
        {formData.product_type_image && (
          <img
            src={URL.createObjectURL(formData.product_type_image)}
            alt="Preview"
            style={{ maxWidth: '100px', maxHeight: '100px', marginTop: '10px' }}
          />
        )}
      </Form.Group>

      <Row>
        <Col>
          <Form.Group controlId="product_type_name">
            <Form.Label>ประเภทสินค้า:</Form.Label>
            <Form.Control type="text" name="product_type_name" value={formData.product_type_name} onChange={handleChange} />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="description">
            <Form.Label>คำอธิบายประเภทสินค้า:</Form.Label>
            <Form.Control type="text" name="description" value={formData.description} onChange={handleChange} />
          </Form.Group>
        </Col>
      </Row>

      <Button variant="primary" type="submit">
        บันทึก
      </Button>
    </Form>
  );
};

export default InsertProductType;
