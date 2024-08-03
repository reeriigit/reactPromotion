import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/Order.css';
import Formmenudetail from './Formmenudetail';

function Order({ user_id, storeId, set_promotion_id, saveOder }) {
  const [user, setUser] = useState(null);
  const [promotion, setPromotion] = useState(null);
  const [store, setStore] = useState(null);// Initialize oder_amount state with 1
  const [priceSetpro, setPriceSetpro] = useState(0);
  const [totalprice, setTotalPrice] = useState(0);
  const [freegift, setFreeGift] = useState(0);
  const [menuDetail, setMenuDetail] = useState([]); // Updated state
  const [showForm, setShowForm] = useState(false); // State for toggling form visibility
  const [orderdetail, setOrderDetail] = useState('');
  useEffect(() => {
    // Fetch user data
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/users/${user_id}`);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    // Fetch promotion data
    const fetchPromotionData = async () => {
      try {
        const response = await axios.get(`/setpromotionjoin/${set_promotion_id}`);
        setPromotion(response.data[0]); // Assuming the API returns an array
      } catch (error) {
        console.error("Error fetching promotion data:", error);
      }
    };

    // Fetch store data
    const fetchStoreData = async () => {
      try {
        const response = await axios.get(`/get_stores/${storeId}`);
        setStore(response.data[0]); // Assuming the API returns an array
      } catch (error) {
        console.error("Error fetching store data:", error);
      }
    };

    fetchUserData();
    fetchPromotionData();
    fetchStoreData();
  }, [user_id, set_promotion_id, storeId]);

  useEffect(() => {
    
    if (promotion && promotion.promo_type === 1) {
      if (promotion.amountcon) {
        if (promotion.valuegiven_id === 2) { // บาท
          setPriceSetpro((promotion.amountcon * promotion.price) - promotion.amountgiven);
          setTotalPrice((promotion.amountcon * promotion.price));
        } else if (promotion.valuegiven_id === 3) { // %
          const pricePer = promotion.price * (promotion.amountgiven / 100);
          setPriceSetpro((promotion.amountcon * promotion.price) - pricePer);
          setTotalPrice((promotion.amountcon * promotion.price));
        } else {
          setPriceSetpro((promotion.amountcon * promotion.price));
          setTotalPrice((promotion.amountcon * promotion.price));
        }
      }
    }

    if (promotion && promotion.promo_type === 2) { // เเถม
      if (promotion.amountcon) {
        setPriceSetpro((promotion.amountcon * promotion.price));
        setTotalPrice((promotion.amountcon * promotion.price) + promotion.price);
        setFreeGift(promotion.amountgiven);
      } else {
        setPriceSetpro((promotion.amountcon * promotion.price));
        setTotalPrice((promotion.amountcon * promotion.price));
        setFreeGift(0);
      }
    }
  }, [ promotion]);

  const handleOrderConfirmation = async () => {
    if (totalprice === undefined || totalprice === null) {
      console.error('Total price is not calculated correctly:', totalprice);
      alert('Total price is not calculated correctly.');
      return;
    }

    console.log('Total Price before sending to API:', totalprice); // Debugging line

    
    const puchaseoder_date = new Date().toISOString().slice(0, 19).replace('T', ' '); // Current date and time
    const puoder_status_id = 1; // Assuming 1 is the status for a new order

    try {
      // Create purchase order
      const puchaseOrderResponse = await axios.post('/puchaseoder_register', {
        user_id,
        storeId,
        puchaseoder_date,
        puoder_status_id,
        puchaseoder_ttprice : totalprice // Ensure this is set correctly
      });

      const puchaseoder_id = puchaseOrderResponse.data.puchaseoderId;

      // Create order
      await axios.post('/oder_register', {
        set_promotion_id,
        totalprice,
        puchaseoder_id,
        order_status_id: 1,
        oder_amount: promotion.amountcon + freegift,
        price: promotion.price,
        price_setpro: priceSetpro,
        menu_detail: menuDetail.join(', '), // Update to pass selected menu details
        purchasetype_id: 2,
        order_detail: orderdetail
      });
      saveOder();
      alert('Order placed successfully!');
    } catch (error) {
      console.error("Error placing order:", error);
      alert('Failed to place order.');
    }
  };

  if (!user || !promotion || !store) {
    return <div>Loading...</div>;
  }

  // Parse images if available
  let images = [];
  try {
    images = JSON.parse(promotion.images);
  } catch (e) {
    console.error('Error parsing images:', e);
  }

  // Function to handle increment of oder_amount
  
  // Function to handle decrement of oder_amount
  

  const handleMenudetail = () => {
    setShowForm(!showForm); // Toggle the form visibility
  };

  return (
    <div className="Order">
      <p style={{boxShadow: '1px 2px 3px #8d8d8d', padding: ' 10px',margin: ' 5px'}}><b>ทำรายการ</b></p>
      <div className="dataaddress">
        <p>ชื่อร้าน : {store.storeName}</p>
        <p>ที่อยู่ : {store.address}</p>
      </div>
      <div className="Orderlist">
        {images.length > 0 && (
          <img width={60} height={60} src={`/productimages/${images[0]}`} alt={promotion.name} style={{ borderRadius: '10px' }} />
        )}
        <div className="">
          <p>{promotion.name}</p>
          <p>{promotion.price}</p>
        </div>
        
        <div className="orderdetail">
          <p>{promotion.promo_name}</p>
        </div>
        <button onClick={handleMenudetail}>กำหนดเมนู</button>
        <div className="amountControl">
          <span>{promotion.amountcon}</span>
        </div>
       
      </div>

      {promotion.promo_type === 2 && (
        <div className="Orderlist">
        {images.length > 0 && (
          <img width={60} height={60} src={`/productimages/${images[0]}`} alt={promotion.name} style={{ borderRadius: '10px' }} />
        )}
        <div className="">
          <p>{promotion.name}</p>
          <p>{promotion.price}</p>
        </div>
        <div className="amountControl">
          {promotion.promo_type === 2 && (<span className='promotype'>เเถม {promotion.amountgiven} {promotion.valuegiven_name}</span>)}
        </div>
      </div>
      )}
      {showForm && ( // Render the Formmenudetail component based on the showForm state
        <Formmenudetail product_type_id={promotion.product_type_id}  orderdetail={orderdetail} menudetail={menuDetail} setMenudetail={setMenuDetail} setOrderDetail={setOrderDetail} />
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
          <p style={{ color: 'orange' }} > ฿{priceSetpro}</p>
        </div>
      </div>
      <div className="pricelist">
        <div className="pricsetpro">
          <p>ยอดรวม:</p>
          <p> ฿{priceSetpro}</p> {/* Update this if you have more items or discounts */}
        </div>
        <button onClick={handleOrderConfirmation}>ยืนยันการซื้อ</button>
      </div>
    </div>
  );
}

export default Order;
