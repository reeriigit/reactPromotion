import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import '../css/Orderlist.css'

const Orderlist = ({ storeId, searchQuery }) => {
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [orders, setOrders] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [selectedPurchaseOrderId, setSelectedPurchaseOrderId] = useState(null);
  const [showOrderPopup, setShowOrderPopup] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPurchaseOrders = async () => {
      try {
        const query = searchQuery ? `search/${searchQuery}` : '';
        const response = await axios.get(`/puchaseoder/store/${storeId}/${query}`);
        setPurchaseOrders(response.data);
        console.log("userorder",response.data)
        setLoading(false);
      } catch (error) {
        setError("Error fetching purchase orders.");
        setLoading(false);
      }
    };

    fetchPurchaseOrders();
  }, [storeId, searchQuery]);

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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = purchaseOrders.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='containerorderlist'>
      <h2>Order List for Store {storeId}</h2>

      {error && <div>{error}</div>}
      
      {purchaseOrders.length === 0 ? (
        <div>No purchase orders found for this store</div>
      ) : (
        <>
          <MDBTable>
            <MDBTableHead>
              <tr>
                <th>Purchase Order ID</th>
                <th>User ID</th>
                <th>Store ID</th>
                <th>Purchase Order Date</th>
                <th>Status ID</th>
                <th>Total Price</th>
                <th>Actions</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {currentItems.map((po) => (
                <tr key={po.puchaseoder_id}>
                  <td>{po.puchaseoder_id}</td>
                  <td>{po.username}</td>
                  <td>{po.storeId}</td>
                  <td>{po.puchaseoder_date}</td>
                  {po.puoder_status_id === 1 && (
                    <td>รอการชำระ</td>
                  )}
                  {po.puoder_status_id === 2 && (
                    <td>ยกเลิก</td>
                  )}
                  {po.puoder_status_id === 3 && (
                    <td>ชำระเเล้ว</td>
                  )}
                  
                  <td>{po.puchaseoder_ttprice}</td>
                  <td>
                    <button className='btn btn-info' onClick={() => handleReadMore(po.puchaseoder_id)}>
                      Read More
                    </button>
                  </td>
                </tr>
              ))}
            </MDBTableBody>
          </MDBTable>

          {showOrderPopup && selectedPurchaseOrderId && (
            <div className='popup'>
              <div className='popup-content'>
                <h3>Order Details for Purchase Order {selectedPurchaseOrderId}</h3>
                {orders[selectedPurchaseOrderId] ? (
                  <MDBTable>
                    <MDBTableHead>
                      <tr>
                        <th>Order ID</th>
                        <th>Product Name</th>
                        <th>Promotion Name</th>
                        <th>Price</th>
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
                          {order.purchasetype_id === 1 && (
                            <td>กลับบ้าน</td>
                          )}
                          {order.purchasetype_id === 2 && (
                            <td>ที่ร้าน</td>
                          )}
                          
                        </tr>
                      ))}
                    </MDBTableBody>
                  </MDBTable>
                ) : (
                  <div>Loading order details...</div>
                )}
                <button onClick={handleClosePopup} className='btn btn-secondary'>Close</button>
              </div>
            </div>
          )}

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
