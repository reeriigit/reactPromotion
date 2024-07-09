import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import { FaCopy } from 'react-icons/fa';

function EditUser({ user_id }) {
  const [data, setData] = useState({
    username: '',
    email: '',
    password: '',
    full_name: '',
    address: '',
    phone_number: '',
    referral_code: '',
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`/users/${user_id}`)
      .then((res) => {
        setData(res.data);
        setLoading(false); // Set to false when data is received
      })
      .catch((err) => {
        console.log(err);
        setLoading(false); // Set to false in case of an error
      });
  }, [user_id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`/edit_user/${user_id}`, data)
      .then((res) => {
        console.log(res);
        alert('Updated successfully');
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(data.referral_code || '');
    alert('Copied to clipboard!');
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container-fluid">
      <h1 className="mt-4 mb-4">ยินดีตอนรับ {data.username}</h1>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>ชื่อผู้ใช้</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={data.username || ''}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>อีเมล์</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={data.email || ''}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>รหัส</Form.Label>
          <Form.Control
            type="text"
            name="password"
            value={data.password || ''}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formFullName">
          <Form.Label>ชื่อ สกุล</Form.Label>
          <Form.Control
            type="text"
            name="full_name"
            value={data.full_name || ''}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formAddress">
          <Form.Label>ที่อยู่</Form.Label>
          <Form.Control
            as="textarea" rows={3}
            name="address"
            value={data.address || ''}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPhoneNumber">
          <Form.Label>เบอร์โทรศัพท์</Form.Label>
          <Form.Control
            type="text"
            name="phone_number"
            value={data.phone_number || ''}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formReferralCode">
          <Form.Label>รหัสผู้ใช้</Form.Label>
          <InputGroup>
            <Form.Control
              type="text"
              name="referral_code"
              value={data.referral_code || ''}
              readOnly
              required
            />
            <Button variant="outline-secondary" onClick={copyToClipboard}>
              <FaCopy />
            </Button>
          </InputGroup>
        </Form.Group>

        <Form.Group className="mb-3">
          <Button type="submit" variant="success" className="d-flex align-items-center">
            บันทึกข้อมูล
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
}

export default EditUser;
