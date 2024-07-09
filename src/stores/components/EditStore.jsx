import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function EditStore({ user_id }) {
  const [store, setStore] = useState(null);
  const [data, setData] = useState({
    logo: null,
    storeName: '',
    storeType: '',
    storeDes: '',
    style: '',
    province: '',
    phone: '',
    address: ''
  });
  const [logoFile, setLogoFile] = useState(null);
  

  useEffect(() => {
    axios.get(`/get_stores_check/${user_id}`)
      .then((res) => {
        setStore(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, [user_id]);

  useEffect(() => {
    if (store) {
      axios.get(`/get_stores/${store.storeId}`)
        .then((res) => {
          setData(res.data[0]);
        })
        .catch((err) => console.log(err));
    }
  }, [store]);

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append('logo', logoFile);
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    axios.put(`/edit_stores/${store.storeId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((res) => {
        console.log(res);
        alert('update suscceffully');
        window.location.reload();
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="container-fluid  ">
      <h1 className="mt-4 mb-4">ยินดีตอนรับร้าน {data.storeName} </h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          {data.logo && <img src={`/images/${data.logo}`} alt="Store Logo" className="img-fluid mt-2" style={{ maxWidth: '200px' }} />}
          <Form.Control type="file" name="logo" onChange={(e) => setLogoFile(e.target.files[0])} />
          
        </Form.Group>
        <Row>
          <Col>
            <Form.Group className="mb-3">
            <Form.Label>ชื่อร้านค้า</Form.Label>
            <Form.Control value={data.storeName || ''} type="text" name="storeName" onChange={(e) => setData({ ...data, storeName: e.target.value })} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
            <Form.Label>ประเภทร้านค้า</Form.Label>
            <Form.Control value={data.storeType || ''} type="text" name="storeType" onChange={(e) => setData({ ...data, storeType: e.target.value })} />
          </Form.Group>
          </Col>
        </Row>
        
        <Form.Group className="mb-3">
          <Form.Label>คำอธิบายร้านค้า</Form.Label>
          <Form.Control value={data.storeDes || ''} as="textarea" rows={3} name="storeDes" onChange={(e) => setData({ ...data, storeDes: e.target.value })} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>สไตล์ของร้านค้า</Form.Label>
          <Form.Control value={data.style || ''} type="text" name="style" onChange={(e) => setData({ ...data, style: e.target.value })} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>จังหวัด</Form.Label>
          <Form.Control value={data.province || ''} type="text" name="province" onChange={(e) => setData({ ...data, province: e.target.value })} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>เบอร์โทรศัพท์</Form.Label>
          <Form.Control value={data.phone || ''} type="text" name="phone" onChange={(e) => setData({ ...data, phone: e.target.value })} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>ที่อยู่</Form.Label>
          <Form.Control as="textarea" rows={3} value={data.address || ''} name="address" onChange={(e) => setData({ ...data, address: e.target.value })} />
        </Form.Group>
        <Button type="submit" variant="success">บันทึกข้อมูล</Button>
      </Form>
    </div>
  );
}

export default EditStore;
