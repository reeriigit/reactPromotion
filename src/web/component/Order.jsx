import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/Order.css';
import Formmenudetail from './Formmenudetail';
import { useNavigate } from 'react-router-dom';

function Order({ user_id, storeId, set_promotion_id, saveOder }) {
  const [user, setUser] = useState(null);
  const [promotion, setPromotion] = useState(null);
  const [store, setStore] = useState(null);
  const [priceSetpro, setPriceSetpro] = useState(0);
  const [totalprice, setTotalPrice] = useState(0);
  const [freegift, setFreeGift] = useState(0);
  const [menuDetail, setMenuDetail] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [orderdetail, setOrderDetail] = useState('');
  const [purchaseType, setPurchaseType] = useState(2);
  const [compostores, setCompostores] = useState([]); // State for compostore options
  const [selectedCompostore, setSelectedCompostore] = useState(''); // State for selected compostore
  const navigate = useNavigate();

  useEffect(() => {
    if (user_id === undefined) {
      navigate('/web/login');
    }
  }, [user_id, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data
        const userResponse = await axios.get(`/users/${user_id}`);
        setUser(userResponse.data);

        // Fetch promotion data
        const promotionResponse = await axios.get(`/setpromotionjoin/${set_promotion_id}`);
        setPromotion(promotionResponse.data[0]);

        // Fetch store data
        const storeResponse = await axios.get(`/get_stores/${storeId}`);
        setStore(storeResponse.data[0]);

        // Fetch compostore data
        const compostoreResponse = await axios.get(`/compostores/${storeId}`);
        setCompostores(compostoreResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [user_id, set_promotion_id, storeId]);

  useEffect(() => {
    if (promotion && promotion.promo_type === 1) {
      if (promotion.amountcon) {
        if (promotion.valuegiven_id === 2) {
          setPriceSetpro(promotion.amountcon * promotion.price - promotion.amountgiven);
          setTotalPrice(promotion.amountcon * promotion.price);
        } else if (promotion.valuegiven_id === 3) {
          const pricePer = promotion.price * (promotion.amountgiven / 100);
          setPriceSetpro(promotion.amountcon * promotion.price - pricePer);
          setTotalPrice(promotion.amountcon * promotion.price);
        } else {
          setPriceSetpro(promotion.amountcon * promotion.price);
          setTotalPrice(promotion.amountcon * promotion.price);
        }
      }
    }

    if (promotion && promotion.promo_type === 2) {
      if (promotion.amountcon) {
        setPriceSetpro(promotion.amountcon * promotion.price);
        setTotalPrice(promotion.amountcon * promotion.price + promotion.price);
        setFreeGift(promotion.amountgiven);
      } else {
        setPriceSetpro(promotion.amountcon * promotion.price);
        setTotalPrice(promotion.amountcon * promotion.price);
        setFreeGift(0);
      }
    }
  }, [promotion]);

  const handleOrderConfirmation = async () => {
    if (totalprice === undefined || totalprice === null) {
      console.error('Total price is not calculated correctly:', totalprice);
      alert('Total price is not calculated correctly.');
      return;
    }

    const puchaseoder_date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const puoder_status_id = 1;

    try {
      const puchaseOrderResponse = await axios.post('/puchaseoder_register', {
        user_id,
        storeId,
        puchaseoder_date,
        puoder_status_id,
        puchaseoder_ttprice: priceSetpro,
        compostore_name: selectedCompostore, // Use the selected compostore name
      });

      const puchaseoder_id = puchaseOrderResponse.data.puchaseoderId;

      await axios.post('/oder_register', {
        set_promotion_id,
        totalprice,
        puchaseoder_id,
        order_status_id: 1,
        oder_amount: promotion.amountcon + freegift,
        price: promotion.price,
        price_setpro: priceSetpro,
        menu_detail: menuDetail.join(', '),
        purchasetype_id: purchaseType,
        order_detail: orderdetail,
      });
      saveOder();
      alert('Order placed successfully!');
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order.');
    }
  };

  if (!user || !promotion || !store) {
    return <div>Loading...</div>;
  }

  let images = [];
  try {
    images = JSON.parse(promotion.images);
  } catch (e) {
    console.error('Error parsing images:', e);
  }

  const handleMenudetail = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="Order">
      <p
        style={{
          boxShadow: '1px 2px 3px #8d8d8d',
          padding: ' 10px',
          margin: ' 5px',
        }}
      >
        <b>ทำรายการ</b>
      </p>
      <div className="dataaddress">
        <p>ชื่อร้าน : {store.storeName}</p>
        <p>ที่อยู่ : {store.address}</p>
      </div>
      <div className="Orderlist">
        {images.length > 0 && (
          <img
            width={60}
            height={60}
            src={`/productimages/${images[0]}`}
            alt={promotion.name}
            style={{ borderRadius: '10px' }}
          />
        )}
        <div className="">
          <p>{promotion.name}</p>
          <p>{promotion.price}</p>
        </div>

        <div className="orderdetail">
          <p>{promotion.promo_name}</p>
        </div>
        
        <select
          name="purchasetype"
          id="purchasetype"
          value={purchaseType}
          onChange={(e) => setPurchaseType(Number(e.target.value))}
        >
          <option value="2">ที่ร้าน</option>
          <option value="1">กลับบ้าน</option>
        </select>

        <select
          name="compostore"
          value={selectedCompostore}
          onChange={(e) => setSelectedCompostore(e.target.value)}
        >
          <option value="">ไม่มี</option>
          {compostores.map((compo) => (
            <option key={compo.compostore_id} value={compo.compostore_name}>
              {compo.compostore_name}
            </option>
          ))}
        </select>

        <button onClick={handleMenudetail}>กำหนดเมนู</button>
        <div className="amountControl">
          <span>{promotion.amountcon}</span>
        </div>
      </div>

      {promotion.promo_type === 2 && (
        <div className="Orderlist">
          {images.length > 0 && (
            <img
              width={60}
              height={60}
              src={`/productimages/${images[0]}`}
              alt={promotion.name}
              style={{ borderRadius: '10px' }}
            />
          )}
          <div className="">
            <p>{promotion.name}</p>
            <p>{promotion.price}</p>
          </div>
          <div className="amountControl">
            {promotion.promo_type === 2 && (
              <span className="promotype">
                เเถม {promotion.amountgiven} {promotion.valuegiven_name}
              </span>
            )}
          </div>
        </div>
      )}
      {showForm && (
        <Formmenudetail
          product_type_id={promotion.product_type_id}
          orderdetail={orderdetail}
          menudetail={menuDetail}
          setMenudetail={setMenuDetail}
          setOrderDetail={setOrderDetail}
        />
      )}

      <b>ข้อมูลการชำระ</b>
      <div className="payment">
        <div className="left">
          <p>ราคา</p>
          <p>ราคารวมจริง</p>
          <p>ราคาโปร</p>
        </div>
        <div className="right">
          <p> ฿{promotion.price}</p>
          <p>฿{totalprice}</p>
          <p style={{ color: 'orange' }}> ฿{priceSetpro}</p>
        </div>
      </div>
      <div className="pricelist">
        <div className="pricsetpro">
          <p>ยอดรวม:</p>
          <p> ฿{priceSetpro}</p>
        </div>
        <button onClick={handleOrderConfirmation}>ยืนยันการซื้อ</button>
      </div>
    </div>
  );
}

export default Order;
