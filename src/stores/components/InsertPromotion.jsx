import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Row, Col, FormGroup } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const InsertPromotion = ({ storeId, user_id, onInsertSuccess }) => {
  const [formData, setFormData] = useState({
    storeId: storeId,
    promo_name: '',
    promo_type: '1', // ปรับเป็น string เพื่อให้เทียบเป็นชนิดของการให้ร่วมกัน
    promo_dec: '',
    amountuse: '',
    amountgiven: '',
    valuegiven_id: '1', // เป็น string เพื่อให้เทียบเป็นชนิดการให้
    amountcon: '',
    valuecon_id: '1', // เป็น string เพื่อให้เทียบเป็นชนิดของการให้ร่วมกัน
    startdate: new Date(),
    enddate: new Date(),
    proimage: null,
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
      proimage: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      await axios.post('/insertPromotion', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // เรียก callback function เมื่อ Insert เสร็จสิ้น
      if (onInsertSuccess) {
        onInsertSuccess();
      }
    } catch (error) {
      console.error('Error inserting promotion:', error);
      alert('Error inserting promotion. Please try again.');
    }
  };

  const handleChangeStartDate = (date) => {
    setFormData({
      ...formData,
      startdate: date,
    });
  };

  const handleChangeEndDate = (date) => {
    setFormData({
      ...formData,
      enddate: date,
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <p className='titlepromotion'>รายละเอียดโปรโมชั่น</p>
      <div className='Generalinformation'>
        <Form.Group controlId="proimage">
          <Form.Label>รูปภาพโปรโมชั่น:</Form.Label>
          <Form.Control type="file" name="proimage" onChange={handleImageChange} />
          {formData.proimage && (
            <img
              src={URL.createObjectURL(formData.proimage)}
              alt="Preview"
              style={{ maxWidth: '100px', maxHeight: '100px', marginTop: '10px' }}
            />
          )}
        </Form.Group>

        <Row>
          <Col>
            <Form.Group controlId="promo_name">
              <Form.Label>ชื่อโปรโมชั่น:</Form.Label>
              <Form.Control type="text" name="promo_name" value={formData.promo_name} onChange={handleChange} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="promo_type">
              <Form.Label>ประเภทโปรโมชั่น:</Form.Label>
              <Form.Select name="promo_type" value={formData.promo_type} onChange={handleChange}>
                <option value="1">โปรโมชั่นส่วนลด</option>
                <option value="2">โปรโมชั่นแบบเเถม</option>
                <option value="3">โปรโมชั่นแบบสะสมแต้ม</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="promo_dec">
          <Form.Label>คำอธิบายโปรโมชั่น:</Form.Label>
          <Form.Control type="text" name="promo_dec" value={formData.promo_dec} onChange={handleChange} />
        </Form.Group>
      </div>

      <p className='titlepromotion'>เงื่อนไขโปรโมชั่น</p>
      <div className='Generalinformation'>
        <Row>
          <Col>
            <Form.Group controlId="amountcon">
              <Form.Label>จำนวน:</Form.Label>
              <Form.Control type="text" name="amountcon" value={formData.amountcon} onChange={handleChange} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="valuecon_id">
              <Form.Label>ค่า</Form.Label>
              <Form.Select name="valuecon_id" value={formData.valuecon_id} onChange={handleChange}>
                <option value="1">ชิ้น</option>
                <option value="2">แต้ม</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Label>เริ่มตั้งเเต่</Form.Label>
            <FormGroup controlId="startdate">
              <DatePicker
                placeholderText="Select startdate date"
                selected={formData.startdate}
                onChange={handleChangeStartDate}
                dateFormat="yyyy-MM-dd"
                className="form-control"
              />
            </FormGroup>
          </Col>
          <Col>
            <Form.Label>ถึง</Form.Label>
            <FormGroup controlId="enddate">
              <DatePicker
                placeholderText="Select end date"
                selected={formData.enddate}
                onChange={handleChangeEndDate}
                dateFormat="yyyy-MM-dd"
                className="form-control"
              />
            </FormGroup>
          </Col>
        </Row>
      </div>

      <p className='titlepromotion'> สิ่งที่ให้กับโปรโมชั่น</p>
      <div className='Generalinformation'>
        <Col>
          <Form.Group controlId="amountuse">
            <Form.Label>
              จำนวน:
              {formData.promo_type === '1' ? 'โปรโมชั่นส่วนลด' : formData.promo_type === '2' ? 'โปรโมชั่นแบบเเถม' : 'โปรโมชั่นแบบสะสมแต้ม'}
            </Form.Label>
            <Form.Control type="text" name="amountuse" value={formData.amountuse} onChange={handleChange} />
          </Form.Group>
        </Col>

        <Row>
          <Col>
            <Form.Group controlId="amountgiven">
              <Form.Label>
                จำนวน:
                {formData.promo_type === '1' ? 'ส่วนลด' : formData.promo_type === '2' ? 'เเถม' : 'แต้ม'}
              </Form.Label>
              <Form.Control type="text" name="amountgiven" value={formData.amountgiven} onChange={handleChange} />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group controlId="valuegiven_id">
              <Form.Label>ค่าที่ให้:</Form.Label>
              <Form.Select name="valuegiven_id" value={formData.valuegiven_id} onChange={handleChange}>
                {formData.promo_type === '1' && (
                  <>
                    <option value="2">บาท</option>
                    <option value="3">%</option>
                  </>
                )}
                {formData.promo_type === '2' && <option value="1">ชิ้น</option>}
                {formData.promo_type === '3' && <option value="4">เเต้ม</option>}
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

export default InsertPromotion;
