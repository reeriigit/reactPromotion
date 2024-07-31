import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';

const RegisterForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    referral_code: '',
    referred_by: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    full_name: '',
    address: '',
    phone_number: '',
    user_type: 2,
  });

  const [passwordsMatch, setPasswordsMatch] = useState(true);

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

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === 'password' || name === 'confirmPassword') {
      setPasswordsMatch(value === formData.password || value === formData.confirmPassword);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!passwordsMatch) {
      alert('Passwords do not match!');
      return;
    }

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
            <Form.Group controlId="referred_by">
              <Form.Label>รหัสผู้แนะนำ:</Form.Label>
              <Form.Control type="text" name="referred_by" value={formData.referred_by} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="username">
              <Form.Label>ชื่อผู้ใช้:</Form.Label>
              <Form.Control type="text" name="username" value={formData.username} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>อีเมล:</Form.Label>
              <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>รหัสผ่าน:</Form.Label>
              <Form.Control type="password" name="password" value={formData.password} onChange={handlePasswordChange} />
            </Form.Group>
            <Form.Group controlId="confirmPassword">
              <Form.Label>ยืนยันรหัสผ่าน:</Form.Label>
              <Form.Control type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handlePasswordChange} />
              {!passwordsMatch && <Form.Text className="text-danger">Passwords do not match!</Form.Text>}
            </Form.Group>
            <Form.Group controlId="full_name">
              <Form.Label>ชื่อ-สกุล:</Form.Label>
              <Form.Control type="text" name="full_name" value={formData.full_name} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="address">
              <Form.Label>ที่อยู่:</Form.Label>
              <Form.Control type="text" name="address" value={formData.address} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="phone_number">
              <Form.Label>เบอร์โทร:</Form.Label>
              <Form.Control type="text" name="phone_number" value={formData.phone_number} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="user_type">
              <Form.Label>User Type:</Form.Label>
              <Form.Control as="select" name="user_type" value={formData.user_type} onChange={handleChange}>
                <option value="2">Buyer</option>
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit" disabled={!passwordsMatch}>
              Register
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterForm;
