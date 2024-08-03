import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/Ordereditems.css'
import { MDBTable, MDBTableBody } from 'mdb-react-ui-kit';

function Ordereditems({ user_id, puoderStatusId }) {
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [orders, setOrders] = useState({});
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    // Fetch purchase orders for the user with the given status
    const fetchPurchaseOrders = async () => {
      try {
        const response = await axios.get(`/puchaseoder/user/${user_id}/status/${puoderStatusId}`);
        setPurchaseOrders(response.data);
      } catch (error) {
        console.error("Error fetching purchase orders:", error);
      }
    };

    fetchPurchaseOrders();
  }, [user_id, puoderStatusId]);

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

  const handleExpandClick = (puchaseoder_id) => {
    setExpandedOrder(expandedOrder === puchaseoder_id ? null : puchaseoder_id);
  };

  return (
    <div className="Ordereditems">
      <h3>รายการ</h3>
      {purchaseOrders.length > 0 ? (
        purchaseOrders.map((po) => (
          <div key={po.puchaseoder_id} className="minicon">
            <div className="purchase-order">
              <div className="datastore">
                <p>ร้านโคขุนเนื้อตุ้น</p>
                <p>{po.puchaseoder_date}</p>
                {po.puoder_status_id === 1 && (
                  <p style={{ color: 'white', display: 'inline', padding: '5px', borderRadius: '5px', border: '1px solid orange',background: 'orange' }}>รอการชำระ</p>
                )}
                {po.puoder_status_id === 2 && (
                  <p style={{ color: 'white', display: 'inline', padding: '5px', borderRadius: '5px', border: '1px solid red',background: 'red' }}>ยกเลิก</p>
                )}
                {po.puoder_status_id === 3 && (
                  <p style={{ color: 'white', display: 'inline', padding: '5px', borderRadius: '5px', border: '1px solid green',background: 'green' }}>ชำระเเล้ว</p>
                )}
              </div>
              <div className="status">
                <div className="totalprice">
                  <p>ราคาทั้งหมด</p>
                  <p>฿{po.puchaseoder_ttprice}</p>
                </div>
                <div className="countorder">
                  <p>ออเดอร์</p>
                  <p>1</p>     
                </div>
              </div>
              <div className="butdetailoder">
                <button onClick={() => handleExpandClick(po.puchaseoder_id)}>
                  {expandedOrder === po.puchaseoder_id ? 'ซ่อนรายละเอียด' : 'ดูรายละเอียด'}
                </button>
              </div>
            </div>
            {expandedOrder === po.puchaseoder_id && (
              <div className="order-details">
                {orders[po.puchaseoder_id] ? (
                  orders[po.puchaseoder_id].map((order) => (
                    <div key={order.oder_id} className="order-item">
                      <MDBTable>
                        <MDBTableBody>
                          <tr>
                            <td>{order.name}</td>
                            <td>{order.promo_name}</td>
                            <td>{order.price}</td>
                            {order.purchasetype_id === 1 && (
                              <td>กลับบ้าน</td>
                            )}
                            {order.purchasetype_id === 2 && (
                              <td>ที่ร้าน</td>
                            )}
                          </tr>
                        </MDBTableBody>
                      </MDBTable>
                    </div>
                  ))
                ) : (
                  <p>กำลังโหลดข้อมูลคำสั่งซื้อ...</p>
                )}
              </div>
            )}
          </div>
        ))
      ) : (
        <p>ไม่พบใบสั่งซื้อ</p>
      )}
    </div>
  );
}

export default Ordereditems;
