import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';

function EditStore() {
  const [data, setData] = useState({
    logo: null,
    storeName: '',
    storeType: '',
    storeDes: '',
    email: '',
    pass: '',
    phone: '',
    address: '',
  });
  const [logoFile, setLogoFile] = useState(null);
  const { storeId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/get_stores/${storeId}`)
      .then((res) => {
        setData(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, [storeId]);

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append('logo', logoFile);
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    axios
      .put(`/edit_stores/${storeId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        const { email, pass } = data;
        navigate(`/stores/mulimages/${email}/${pass}`);
        console.log(res);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="container">
      <Row className="justify-content-center mt-5">
        <Col md={6}>
          <h1 className="text-white mb-4">Edit Store {storeId}</h1>
          <Link to="/" className="text-white mb-3 d-block">
            Back
          </Link>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label className="text-white">Logo</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setLogoFile(e.target.files[0])}
              />
              {data.logo && (
                <img
                  src={`images/${data.logo}`}
                  alt="Store Logo"
                  className="img-fluid mt-2"
                />
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label className="text-white">Store Name</Form.Label>
              <Form.Control
                value={data.storeName || ''}
                type="text"
                onChange={(e) => setData({ ...data, storeName: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className="text-white">Store Type</Form.Label>
              <Form.Control
                as="select"
                value={data.storeType}
                onChange={(e) => setData({ ...data, storeType: e.target.value })}
              >
                <option value="">Choose Store Type</option>
                <option value="1">ร้านบริการ</option>
                <option value="2">ร้านอาหาร</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label className="text-white">Store Description</Form.Label>
              <Form.Control
                value={data.storeDes || ''}
                type="text"
                onChange={(e) => setData({ ...data, storeDes: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className="text-white">Email</Form.Label>
              <Form.Control
                value={data.email || ''}
                type="text"
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className="text-white">Password</Form.Label>
              <Form.Control
                value={data.pass || ''}
                type="text"
                onChange={(e) => setData({ ...data, pass: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className="text-white">Phone</Form.Label>
              <Form.Control
                value={data.phone || ''}
                type="text"
                onChange={(e) => setData({ ...data, phone: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className="text-white">Address</Form.Label>
              <Form.Control
                as="textarea"
                value={data.address || ''}
                onChange={(e) => setData({ ...data, address: e.target.value })}
              />
            </Form.Group>
            <Button type="submit" variant="light">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default EditStore;
