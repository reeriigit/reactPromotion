import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';

const RegisterForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    full_name: '',
    address: '',
    phone_number: '',
    user_type: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('/users_register', formData)
      .then((response) => {
        console.log('User created successfully:', response.data);
        navigate(`/web/login`);
      })
      .catch((error) => {
        console.error('Error creating user:', error.response.data);
      });
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h3>Register</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="username">
              <Form.Label>Username:</Form.Label>
              <Form.Control type="text" name="username" value={formData.username} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email:</Form.Label>
              <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password:</Form.Label>
              <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="full_name">
              <Form.Label>Full Name:</Form.Label>
              <Form.Control type="text" name="full_name" value={formData.full_name} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="address">
              <Form.Label>Address:</Form.Label>
              <Form.Control type="text" name="address" value={formData.address} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="phone_number">
              <Form.Label>Phone Number:</Form.Label>
              <Form.Control type="text" name="phone_number" value={formData.phone_number} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="user_type">
              <Form.Label>User Type:</Form.Label>
              <Form.Control as="select" name="user_type" value={formData.user_type} onChange={handleChange}>  
                <option value="2">Buyer</option>
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">
              Register
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterForm;
