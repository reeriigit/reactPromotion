import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Row, Col, FormGroup } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const UpdatePromotion = ({ storeId, onInsertSuccess, promo_id }) => {
  const [data, setData] = useState({
    storeId: storeId,
    proimage: null,
    promo_name: '',
    promo_type: '',
    promo_dec: '',
    amountuse: '',
    amountgiven: '',
    valuegiven_id: '',
    amountcon: '',
    valuecon_id: '',
    startdate: null,
    enddate: null,
  });

  const [proimagesfile, setproimagesfile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/get_promotion/${promo_id}`);
        setData(response.data);
        console.log("Existing promotion data:", response.data);
      } catch (error) {
        console.error('Error fetching promotion:', error);
      }
    };

    fetchData();
  }, [promo_id]);

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append('proimage', proimagesfile);
Object.entries(data).forEach(([key, value]) => {
  formData.append(key, value);
});


    console.log("Data to be sent:", formData);

    axios.put(`/update_promotion/${promo_id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    
      .then((res) => {
        console.log(res);
        console.log("ข้อมูล data",formData);
        if (onInsertSuccess) {
          onInsertSuccess();
        }
      })
      .catch((err) => {
        console.log("fuck err",err);
        alert('Error updating promotion. Please check the console for more details.');
      });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <p className='titlepromotion'>รายละเอียดโปรโมชั่น</p>
      <div className='Generalinformation'>
      <Form.Group controlId="proimage">
        <Form.Label>รูปภาพโปรโมชั่น: {promo_id}</Form.Label>
        <Form.Control
          type="file"
          name="proimage"
          onChange={(e) => {
            setproimagesfile(e.target.files[0]);
            // Clear previous image preview when a new file is selected
            setData({ ...data, proimagePreview: null });
          }}
        />

  {data.proimagePreview || proimagesfile ? (
    <img
      src={
        data.proimagePreview
          ? URL.createObjectURL(data.proimagePreview)
          : URL.createObjectURL(proimagesfile)
      }
      alt="Preview"
      style={{ maxWidth: '100px', maxHeight: '100px', marginTop: '10px' }}
    />
  ) : (
    <img
      src={`/proimages/${data.proimage}`}
      alt="Preview"
      style={{ maxWidth: '100px', maxHeight: '100px', marginTop: '10px' }}
    />
  )}

      </Form.Group>

      <Row>
        <Col>
          <Form.Group controlId="promo_name">
            <Form.Label>ชื่อโปรโมชั่น:</Form.Label>
            <Form.Control value={data.promo_name || ''} type="text" name="promo_name" onChange={(e) => setData({ ...data, promo_name: e.target.value })} />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="promo_type">
            <Form.Label>ประเภทโปรโมชั่น:</Form.Label>
            <Form.Select  value={data.promo_type || ''} name="promo_type" onChange={(e) => setData({ ...data, promo_type: e.target.value })}>
              <option value={1}>โปรโมชั่นส่วนลด</option>
              <option value={2}>โปรโมชั่นแบบเเถม</option>
              <option value={3}>โปรโมชั่นแบบสะสมแต้ม</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <Form.Group controlId="promo_dec">
        <Form.Label>คำอธิบายโปรโมชั่น:</Form.Label>
        <Form.Control value={data.promo_dec || ''} type="text" name="promo_dec" onChange={(e) => setData({ ...data, promo_dec: e.target.value })} />
      </Form.Group>
      </div>
      <p className='titlepromotion'>เงือนไขโปรโมชั่น</p>
      <div className='Generalinformation'>
      <Row>
      <Col>
          <Form.Group controlId="amountcon">
            <Form.Label>จำนวน:</Form.Label>
            <Form.Control value={data.amountcon || ''} type="text" name="amountcon" onChange={(e) => setData({ ...data, amountcon: e.target.value })} />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="valuecon_id">
            <Form.Label>ค่า</Form.Label>
            <Form.Select value={data.valuecon_id || ''} name="valuecon_id" onChange={(e) => setData({ ...data, valuecon_id: e.target.value })}>
              <option value={1}>ชิ้น</option>
              <option value={2}>แต้ม</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <Row>

        <Col>
          <Form.Label>ตั้งเเต่</Form.Label>
          <FormGroup controlId="startdate">
            <DatePicker
              placeholderText="Select start date"
              selected={data.startdate}
              onChange={(date) => {
                setData({
                  ...data,
                  startdate: date,
                });
              }}
              dateFormat="yyyy-MM-dd"
              className="form-control"
            />
            <p>Selected end date: {data.startdate = new Date(data.startdate).toLocaleDateString('en-TH', { timeZone: 'Asia/Bangkok' })}</p>
          </FormGroup>
        </Col>
        <Col>
          <Form.Label>ถึง</Form.Label>
          <FormGroup controlId="enddate">
            <DatePicker
              placeholderText="Select end date"
              selected={data.enddate}
              onChange={(date) => {
                setData({
                  ...data,
                  enddate: date,
                });
              }}
              dateFormat="yyyy-MM-dd"
              className="form-control"
            />
            <p>Selected end date: {data.enddate = new Date(data.enddate).toLocaleDateString('en-TH', { timeZone: 'Asia/Bangkok' })}</p>
          </FormGroup>
        </Col>
      </Row>
      </div>


      <p className='titlepromotion'> สิ่งที่ให้กับโปรโมชั่น</p>
      <div className='Generalinformation'>
     <Form.Group controlId="amountuse">
            <Form.Label>Amount to Use:</Form.Label>
            <Form.Control value={data.amountuse || ''} type="text" name="amountuse" onChange={(e) => setData({ ...data, amountuse: e.target.value })} />
      </Form.Group>


      <Row>
        <Col>
          <Form.Group controlId="amountgiven">
          <Form.Label>จำนวน:{data.promo_type === '1' ? 'โปรโมชั่นส่วนลด' : data.promo_type === '2' ? 'โปรโมชั่นแบบเเถม' : 'โปรโมชั่นแบบสะสมแต้ม'}</Form.Label>
            <Form.Control value={data.amountgiven || ''} type="text" name="amountgiven" onChange={(e) => setData({ ...data, amountgiven: e.target.value })} />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="valuegiven_id">
          <Form.Label>ค่าที่ให้:{data.promo_type === '1' ? 'ส่วนลด' : data.promo_type === '2' ? 'เเถม' : 'แต้ม'}</Form.Label>
            <Form.Select value={data.valuegiven_id || ''} name="valuegiven_id" onChange={(e) => setData({ ...data, valuegiven_id: e.target.value })}>
              <option value={1}>ชิ้น</option>
              <option value={2}>บาท</option>
              <option value={3}>%</option>
              <option value={4}>เเต้ม</option>
            </Form.Select>
          </Form.Group>
        </Col>
        
      </Row>
      
     </div>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default UpdatePromotion;
