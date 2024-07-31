import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';


const Orderlist = ({ storeId }) => {
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [orders, setOrders] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderPopup, setShowOrderPopup] = useState(false);

  useEffect(() => {
    const fetchPurchaseOrders = async () => {
      try {
        const response = await axios.get(`/puchaseoder/store/${storeId}`);
        setPurchaseOrders(response.data);
      } catch (error) {
        console.error("Error fetching purchase orders:", error);
      }
    };

    fetchPurchaseOrders();
  }, [storeId]);

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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = purchaseOrders.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleReadMore = (order) => {
    setSelectedOrder(order);
    setShowOrderPopup(true);
  };

  const handleClosePopup = () => {
    setShowOrderPopup(false);
  };

  return (
    <div className='containerlist'>
      <h2>Order List for Store {storeId}</h2>
      <MDBTable>
        <MDBTableHead>
          <tr>
            <th>Purchase Order ID</th>
            <th>Order ID</th>
            <th>Product Name</th>
            <th>Promotion Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {currentItems.map((po) => (
            orders[po.puchaseoder_id] ? (
              orders[po.puchaseoder_id].map((order) => (
                <tr key={order.oder_id}>
                  <td>{po.puchaseoder_id}</td>
                  <td>{order.oder_id}</td>
                  <td>{order.name}</td>
                  <td>{order.promo_name}</td>
                  <td>{order.price}</td>
                  <td>
                    <button className='btn btn-info' onClick={() => handleReadMore(order)}>Read More</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr key={po.puchaseoder_id}>
                <td colSpan="6">Loading orders for purchase order {po.puchaseoder_id}...</td>
              </tr>
            )
          ))}
        </MDBTableBody>
      </MDBTable>

      {showOrderPopup && selectedOrder && (
        <div className='popup'>
          <div className='popup-content'>
            <h3>Order {selectedOrder.oder_id}</h3>
            <p>Product Name: {selectedOrder.name}</p>
            <p>Promotion Name: {selectedOrder.promo_name}</p>
            <p>Price: {selectedOrder.price}</p>
            {/* Add more order details here */}
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
    </div>
  );
};

export default Orderlist;
