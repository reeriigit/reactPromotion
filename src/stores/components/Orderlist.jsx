import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import '../css/Orderlist.css';
import ShowEditStatusPopup from './ShowEditStatusPopup';

const Orderlist = ({ storeId, searchQuery }) => {
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [orders, setOrders] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [selectedPurchaseOrderId, setSelectedPurchaseOrderId] = useState(null);
  const [showOrderPopup, setShowOrderPopup] = useState(false);
  const [showEditStatusPopup, setShowEditStatusPopup] = useState(false);
  const [selectedPurchaseOrderForEdit, setSelectedPurchaseOrderForEdit] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statuspuorder, setStatuspuorder] = useState('');

  useEffect(() => {
    const fetchPurchaseOrders = async () => {
      try {
        const query = searchQuery ? `/search/${searchQuery}` : '';
        const statusQuery = statuspuorder ? `status/${statuspuorder}` : '';
        const response = await axios.get(`/puchaseoder/store/${storeId}/${statusQuery}${query}`);
        setPurchaseOrders(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching purchase orders.");
        setLoading(false);
      }
    };

    fetchPurchaseOrders();
  }, [storeId, searchQuery, statuspuorder]);

  const fetchOrdersForPurchaseOrder = async (purchaseOrderId) => {
    try {
      const response = await axios.get(`/orders/puchaseorder/${purchaseOrderId}`);
      setOrders({ [purchaseOrderId]: response.data });
    } catch (error) {
      console.error(`Error fetching orders for purchase order ${purchaseOrderId}:`, error);
    }
  };

  const handleReadMore = (purchaseOrderId) => {
    setSelectedPurchaseOrderId(purchaseOrderId);
    fetchOrdersForPurchaseOrder(purchaseOrderId);
    setShowOrderPopup(true);
  };

  const handleClosePopup = () => {
    setShowOrderPopup(false);
    setSelectedPurchaseOrderId(null);
  };

  const handleEditStatus = (purchaseOrderId) => {
    setSelectedPurchaseOrderForEdit(purchaseOrderId);
    setShowEditStatusPopup(true);
  };

  const handleSaveStatus = async () => {
    try {
      await axios.put(`/edit_puchaseoder/status/${selectedPurchaseOrderForEdit}`, {
        puoder_status_id: selectedStatus
      });
      setPurchaseOrders(prevOrders =>
        prevOrders.map(order =>
          order.puchaseoder_id === selectedPurchaseOrderForEdit
            ? { ...order, puoder_status_id: selectedStatus }
            : order
        )
      );
      setShowEditStatusPopup(false);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleCloseEditStatusPopup = () => {
    setShowEditStatusPopup(false);
    setSelectedPurchaseOrderForEdit(null);
    setSelectedStatus(null);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = purchaseOrders.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='containerorderlist'>
      <h2>รายการสั่งซื้อ {storeId}</h2>
      <select className="status-select" onChange={(e) => setStatuspuorder(e.target.value)}>
        <option value="">ทั้งหมด</option>
        <option value="1">รอการชำระ</option>
        <option value="2">ยกเลิก</option>
        <option value="3">ชำระเเล้ว</option>
      </select>
      {error && <div>{error}</div>}

      {purchaseOrders.length === 0 ? (
        <div>No purchase orders found for this store</div>
      ) : (
        <>
          <MDBTable>
            <MDBTableHead>
              <tr>
                <th>ใบสั่งซื้อ ไอดี</th>
                <th>ชื่อผู้ใช้</th>
                <th>เวลา</th>
                <th>สถานะ</th>
                <th>ราคาทั้งหมด</th>
                <th>โต๊ะ/ห้อง</th>
                <th>รายการ</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {currentItems.map((po) => (
                <tr key={po.puchaseoder_id}>
                  <td>{po.puchaseoder_id}</td>
                  <td>{po.username}</td>
                  <td>{po.puchaseoder_date}</td>
                  <td>
                    {po.puoder_status_id === 1 ? (
                      <button className='btn btn-warning' onClick={() => handleEditStatus(po.puchaseoder_id)}>รอการชำระ</button>
                    ) : po.puoder_status_id === 2 ? (
                      <button className='btn btn-danger' onClick={() => handleEditStatus(po.puchaseoder_id)}>ยกเลิก</button>
                    ) : (
                      <button className='btn btn-success' onClick={() => handleEditStatus(po.puchaseoder_id)}>ชำระเเล้ว</button>
                    )}
                  </td>
                  <td>{po.puchaseoder_ttprice}</td>
                  <td>{po.compostore_name}</td>
                  <td>
                    <button className='btn btn-info' onClick={() => handleReadMore(po.puchaseoder_id)}>
                      ดูรายการ
                    </button>
                  </td>
                </tr>
              ))}
            </MDBTableBody>
          </MDBTable>

          {showOrderPopup && selectedPurchaseOrderId && (
            <div className='popup'>
              <div className='popup-content'>
                <h3>รายการที่สั่ง</h3>
                {orders[selectedPurchaseOrderId] ? (
                  <MDBTable>
                    <MDBTableHead>
                      <tr>
                        <th>ไอดีคำสั่งซื้อ</th>
                        <th>สินค้า</th>
                        <th>โปรโมชั่น</th>
                        <th>ราคา</th>
                        <th>เเบบ</th>
                      </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                      {orders[selectedPurchaseOrderId].map((order) => (
                        <tr key={order.oder_id}>
                          <td>{order.oder_id}</td>
                          <td>{order.name}</td>
                          <td>{order.promo_name}</td>
                          <td>{order.price}</td>
                          <td>
                            {order.purchasetype_id === 1 ? "กลับบ้าน" : "ที่ร้าน"}
                          </td>
                         
                        </tr>
                      ))}
                    </MDBTableBody>
                  </MDBTable>
                ) : (
                  <div>Loading order details...</div>
                )}
                <button onClick={handleClosePopup} className='btn btn-danger'>ปิด</button>
              </div>
            </div>
          )}

          <ShowEditStatusPopup 
            showEditStatusPopup={showEditStatusPopup}
            selectedPurchaseOrderForEdit={selectedPurchaseOrderForEdit}
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
            handleSaveStatus={handleSaveStatus}
            handleCloseEditStatusPopup={handleCloseEditStatusPopup}
          />

          <ul className='pagination'>
            {Array.from({ length: Math.ceil(purchaseOrders.length / itemsPerPage) }, (_, index) => (
              <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                <button onClick={() => paginate(index + 1)} className='page-link'>
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Orderlist;
