import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/Ordereditems.css';
import { MDBTable, MDBTableBody } from 'mdb-react-ui-kit';
import QRCode from 'qrcode.react';

function Ordereditems({ user_id, puoderStatusId }) {
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [orders, setOrders] = useState({});
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [showQRCodePopup, setShowQRCodePopup] = useState(false);
  const [qrCodeData, setQRCodeData] = useState('');

  useEffect(() => {
    const fetchPurchaseOrders = async () => {
      try {
        const response = await axios.get(`/puchaseoder/user/${user_id}/status/${puoderStatusId}`);
        setPurchaseOrders(response.data);
        console.log("userorder", response.data);
      } catch (error) {
        console.error("Error fetching purchase orders:", error);
      }
    };

    fetchPurchaseOrders();
  }, [user_id, puoderStatusId]);

  useEffect(() => {
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

  const handleQRCodeClick = (purchaseOrder) => {
    const data = `${purchaseOrder.puchaseoder_id}`;
    setQRCodeData(data);
    setShowQRCodePopup(true);
  };

  const handleCloseQRCodePopup = () => {
    setShowQRCodePopup(false);
    setQRCodeData('');
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
                  <p style={{ color: 'white', display: 'inline', padding: '5px', borderRadius: '5px', border: '1px solid orange', background: 'orange' }}>รอการชำระ</p>
                )}
                {po.puoder_status_id === 2 && (
                  <p style={{ color: 'white', display: 'inline', padding: '5px', borderRadius: '5px', border: '1px solid red', background: 'red' }}>ยกเลิก</p>
                )}
                {po.puoder_status_id === 3 && (
                  <p style={{ color: 'white', display: 'inline', padding: '5px', borderRadius: '5px', border: '1px solid green', background: 'green' }}>ชำระเเล้ว</p>
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
                 <button onClick={() => handleQRCodeClick(po)}>
                    รหัสคำสั่งซื้อ
                  </button>
                  
                <button onClick={() => handleExpandClick(po.puchaseoder_id)}>
                  {expandedOrder === po.puchaseoder_id ? 'ซ่อนรายละเอียด' : 'ดูรายละเอียด'}
                </button>
                <button>{po.compostore_name}</button>
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
                            <td>{order.price_setpro}</td>
                            <td>{order.oder_amount}</td>
                            {order.purchasetype_id === 1 && (
                              <td>กลับบ้าน</td>
                            )}
                            {order.purchasetype_id === 2 && (
                              <td>ที่ร้าน</td>
                            )}

                            {order.order_status_id === 1 && (
                              <td>รอดำเนินการ</td>
                            )}
                            {order.order_status_id === 2 && (
                              <td>กำลังทำการ</td>
                            )}
                            {order.order_status_id === 3 && (
                              <td>เสร็จสิน</td>
                            )}
                            {order.order_status_id === 4 && (
                              <td>ยกเลิก</td>
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

      {showQRCodePopup && (
        <div className="popup">
          <p>{qrCodeData}</p>
          <QRCode value={qrCodeData} size={250}/>
          <button onClick={handleCloseQRCodePopup} className="btn btn-secondary">ปิด</button>
        </div>
      )}
    </div>
  );
}

export default Ordereditems;
