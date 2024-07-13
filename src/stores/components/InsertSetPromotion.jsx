import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';

const InsertSetPromotion = ({ storeId, onInsertSuccess }) => {
  const [formData, setFormData] = useState({
    storeId: storeId,
    promo_id: '',
    product_ids: [],
  });

  const [promotions, setPromotions] = useState([]);
  const [promotion, setPromotion] = useState(null);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [selectpromo_id, setSelectpromo_id] = useState('');
  const [showPromotionSelection, setShowPromotionSelection] = useState(false);

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const response = await axios.get(`/promotions/${storeId}`);
        setPromotions(response.data);
      } catch (error) {
        console.error('Error fetching set promotions:', error);
      }
    };

    fetchPromotions();
  }, [storeId]); // Dependency on storeId to fetch promotions

  useEffect(() => {
    if (selectpromo_id) {
      const fetchPromotion = async () => {
        try {
          const response = await axios.get(`/promotion/${selectpromo_id}`);
          setPromotion(response.data);
        } catch (error) {
          console.error('Error fetching promotion:', error);
        }
      };

      fetchPromotion();
    }
  }, [selectpromo_id]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`/products/${storeId}`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [storeId]); // Dependency on storeId to fetch products

  const handlePromoChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setSelectpromo_id(value);
    setShowPromotionSelection(false); // Close the promotion selection popup
  };

  const handleProductChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData({
        ...formData,
        product_ids: [...formData.product_ids, value],
      });
    } else {
      setFormData({
        ...formData,
        product_ids: formData.product_ids.filter((id) => id !== value),
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.promo_id === '' || formData.product_ids.length === 0) {
      setError('โปรดเลือกโปรโมชั่นและสินค้าอย่างน้อยหนึ่งรายการ');
      return;
    }

    try {
      await axios.post('/insertSetPromotions', {
        promotions: formData.product_ids.map((product_id) => ({
          promo_id: formData.promo_id,
          product_id: product_id,
          storeId: formData.storeId,
        })),
      });

      if (onInsertSuccess) {
        onInsertSuccess();
      }
    } catch (error) {
      console.error('Error inserting set promotions:', error);
      alert('Error inserting set promotions. Please try again.');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {error && <Alert variant="danger">{error}</Alert>}
      <Row>
        <Col>
          <Form.Group controlId='promo_id'>
            <Form.Label>เลือกโปรโมชั่น:</Form.Label>
            <div>
              <Button
                variant="secondary"
                onClick={() => setShowPromotionSelection(true)}
              >
                เลือกโปรโมชั่น
              </Button>
              
            </div>
            {showPromotionSelection && (
              <div style={{ maxHeight: '200px', overflowY: 'scroll' }}>
                {promotions.map((promo) => (
                  <Form.Check
                    key={promo.promo_id}
                    type='radio'
                    id={`promo-${promo.promo_id}`}
                    label={promo.promo_name}
                    name='promo_id'
                    value={promo.promo_id}
                    checked={formData.promo_id === promo.promo_id}
                    onChange={handlePromoChange}
                  />
                ))}
              </div>
            )}
            {formData.promo_id && promotion && (
              <p>โปรโมชั่นที่เลือก: {promotion.promo_name}</p>
            )}
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form.Group controlId='product_ids'>
            <Form.Label>เลือกสินค้า:</Form.Label>
            {products.map((product) => (
              <Form.Check
                key={product.product_id}
                type="checkbox"
                id={`product-${product.product_id}`}
                label={`Product: ${product.name}`}
                value={product.product_id}
                checked={formData.product_ids.includes(product.product_id.toString())}
                onChange={handleProductChange}
              />
            ))}
          </Form.Group>
        </Col>
      </Row>
      <Button variant='primary' type='submit'>
        บันทึก
      </Button>
    </Form>
  );
};

export default InsertSetPromotion;
