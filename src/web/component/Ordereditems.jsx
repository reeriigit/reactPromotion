import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/Popuser.css';

function Ordereditems({ user_id }) {
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [orders, setOrders] = useState({});

  useEffect(() => {
    // Fetch purchase orders for the user
    const fetchPurchaseOrders = async () => {
      try {
        const response = await axios.get(`/puchaseoder/user/${user_id}`);
        setPurchaseOrders(response.data);
      } catch (error) {
        console.error("Error fetching purchase orders:", error);
      }
    };

    fetchPurchaseOrders();
  }, [user_id]);

  useEffect(() => {
    // Fetch orders for each purchase order
    const fetchOrdersForPurchaseOrders = async () => {
      const newOrders = {};
      for (const po of purchaseOrders) {
        try {
          const response = await axios.get(`/orders/puchaseorder/${po.puchaseoder_id}`);
          newOrders[po.puchaseoder_id] = response.data;
        } catch (error) {
          console.error(`Error fetching orders for purchase order ${po.puchaseoder_id}:`, error);
        }
      }
      setOrders(newOrders);
    };

    if (purchaseOrders.length > 0) {
      fetchOrdersForPurchaseOrders();
    }
  }, [purchaseOrders]);

  return (
    <div className="Ordereditems">
      <button>{user_id}</button>
      {purchaseOrders.length > 0 ? (
        purchaseOrders.map((po) => (
          <div key={po.puchaseoder_id}>
            <h3>Purchase Order {po.puchaseoder_id}</h3>
            {orders[po.puchaseoder_id] ? (
              orders[po.puchaseoder_id].map((order) => (
                <div key={order.oder_id}>
                  <p>Order {order.oder_id}</p>
                  <p>Product Name: {order.name}</p>
                  <p>Promotion Name: {order.promo_name}</p>
                  <p>Price: {order.price}</p>
                  {/* Add more order details here */}
                </div>
              ))
            ) : (
              <p>Loading orders...</p>
            )}
          </div>
        ))
      ) : (
        <p>No purchase orders found.</p>
      )}
    </div>
  );
}

export default Ordereditems;
