import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/Order.css';

function Order({ user_id, storeId, set_promotion_id, saveOder }) {
  const [user, setUser] = useState(null);
  const [promotion, setPromotion] = useState(null);
  const [store, setStore] = useState(null);
  const [oderAmount, setOderAmount] = useState(1); // Initialize oder_amount state with 1
  const [priceSetpro, setPriceSetpro] = useState(0);
  const [totalprice, setTotalPrice] = useState(0);
  const [freegift, setFreeGift] = useState(0);
  
  

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

        if(oderAmount >= promotion.amountcon){
          if(promotion.valuegiven_id===2){ //บาท
            setPriceSetpro((oderAmount * promotion.price )-promotion.amountgiven);
            setTotalPrice((oderAmount * promotion.price));
          }else if(promotion.valuegiven_id===3){ // %
            //10% 10/100 
            const priceper = promotion.price*(promotion.amountgiven/100);
            setPriceSetpro((oderAmount * promotion.price )-(priceper));
            setTotalPrice((oderAmount * promotion.price));
          }else{
            setPriceSetpro((oderAmount * promotion.price));
            setTotalPrice((oderAmount * promotion.price));
          }
        }
    
    }


    if (promotion && promotion.promo_type === 2) {
      if (oderAmount >= promotion.amountcon) {
        setPriceSetpro((oderAmount * promotion.price));
        setTotalPrice((oderAmount * promotion.price)+promotion.price);
        setFreeGift(promotion.amountgiven)   
      } 
       else {
        setPriceSetpro((oderAmount * promotion.price));
        setTotalPrice((oderAmount * promotion.price));
      }
    }
  }, [oderAmount, promotion]);
  
 
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
        totalprice // Ensure this is set correctly
      });
  
      const puchaseoder_id = puchaseOrderResponse.data.puchaseoderId;
  
      // Create order
      await axios.post('/oder_register', {
        set_promotion_id,
        totalprice,
        puchaseoder_id,
        order_status_id: 1,
        oder_amount: oderAmount + freegift,
        price: promotion.price,
        price_setpro: priceSetpro
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
  const handleIncrement = () => {
    setOderAmount(prevAmount => prevAmount + 1);
  };

  // Function to handle decrement of oder_amount
  const handleDecrement = () => {
    if (oderAmount > 1) {
      setOderAmount(prevAmount => prevAmount - 1);
    }
  };

  return (
    <div className="Order">
      <p>ทำรายการ {user_id} {set_promotion_id} {storeId}</p>
      <div className="dataaddress">
        <p>ชื่อร้าน : {store.storeName}</p>
        <p>ที่อยู่ : {store.address}</p>
      </div>
      <div className="Orderlist">
        {images.length > 0 && (
          <img width={60} height={60} src={`/productimages/${images[0]}`} alt={promotion.name} style={{ borderRadius: '10px' }} />
        )}
        <p>ชื่อสินค้า: {promotion.name}</p>
        <div className="amountControl">
          <button onClick={handleDecrement}>-</button>
          <span>{oderAmount}</span>
          <button onClick={handleIncrement}>+</button>
        </div>
      </div>
      <div className="showpromotion">
        <p>ชื่อโปร: {promotion.promo_name}</p>
      </div>
      <div className="payment">
        <p>ราคา: ฿{promotion.price}</p>
        <p>ราคาโปร: ฿{priceSetpro}</p>
      </div>
      <div className="pricelist">
      <p>ยอดรวม: ฿{totalprice}</p> {/* Update this if you have more items or discounts */}
        <button onClick={handleOrderConfirmation}>ยืนยันการซื้อ</button>
      </div>
    </div>
  );
}

export default Order;
