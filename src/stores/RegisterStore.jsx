import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const RegisterStore = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    referral_code: '',
    referred_by: '',
    username: '',
    email: '',
    password: '',
    full_name: '',
    address: '',
    phone_number: '',
    user_type: 3,
  });

  const checkReferralCode = useCallback(async (code) => {
    try {
      const response = await axios.get(`/check_referral_code/${code}`);
      return response.data.exists; // Adjust based on your API response
    } catch (error) {
      console.error('Error checking referral code:', error);
      return false;
    }
  }, []);

  const generateReferralCode = useCallback(async () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 10; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    const exists = await checkReferralCode(result);
    if (exists) {
      return generateReferralCode(); // Recurse until a unique code is generated
    }
    return result;
  }, [checkReferralCode]);

  useEffect(() => {
    const setUniqueReferralCode = async () => {
      const code = await generateReferralCode();
      setFormData((prevData) => ({
        ...prevData,
        referral_code: code,
      }));
    };
    setUniqueReferralCode();
  }, [generateReferralCode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('/users_register', formData);
      console.log('User created successfully:', formData);
      const { username, password } = formData;
      navigate(`/stores/create/${username}/${password}`);
    } catch (error) {
      console.error('Error creating user:', error.response.data);
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h3>Register</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="referred_by">
              <Form.Label>รหัสผู้แนะนำ:</Form.Label>
              <Form.Control type="text" name="referred_by" value={formData.referred_by} onChange={handleChange} />
            </Form.Group>
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
                <option value="3">Store</option>
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

export default RegisterStore;
