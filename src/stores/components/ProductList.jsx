import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

const ProductList = ({ onchangeUpdate, storeId }) => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/products/${storeId}`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, [storeId]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleReadMore = (product) => {
    setSelectedProduct(product);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleDelete = (productId) => {
    setSelectedProduct(productId);
    setDeleteConfirmation(true);
  };

  const handleConfirmDelete = () => {
    axios
      .delete(`/deleteProduct/${selectedProduct}`)
      .then(() => {
        setDeleteConfirmation(false);
        window.location.reload();
      })
      .catch((err) => {
        console.error(err);
        setDeleteConfirmation(false);
      });
  };

  const handleCancelDelete = () => {
    setDeleteConfirmation(false);
    setSelectedProduct(null);
  };

  return (
    <div className='containerlist'>
      <h2>รายการสินค้า</h2>
      <MDBTable>
        <MDBTableHead>
          <tr>
            <th>ID</th>
            <th>รูป</th>
            <th>ID store {storeId}</th>
            <th>ชื่อ</th>
            <th>คำอธิบาย</th>
            <th>ราคา</th>
            <th>จำนวนคงเหลือ</th>
            <th>Action</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {currentItems.map((product) => (
            <tr key={product.product_id}>
              <td>{product.product_id}</td>
              <td>
                <img
                  src={`/productimages/${product.images}`}
                  alt=''
                  style={{ borderRadius: '10px', width: '70px', height: '70px' }}
                  className='rounded'
                />
              </td>
              <td>{product.storeId}</td>
              <td>{product.name}</td>
              <td>
                <button className='buttondes' onClick={() => handleReadMore(product)}>
                  อ่าน
                </button>
                {selectedProduct === product && showPopup && (
                  <div className='popup'>
                    <div className='detail'>
                      <p>Description: {product.description}</p>
                    </div>
                    <button onClick={handleClosePopup}>ปิด</button>
                  </div>
                )}
              </td>
              <td>{product.price}</td>
              <td>{product.quantity_in_stock}</td>
              <td>
                <button onClick={() => onchangeUpdate(product.product_id)} className='btn btn-success btndel'>
                  แก้ไข
                </button>
                <button onClick={() => handleDelete(product.product_id)} className='btn btn-danger btndel'>
                  ลบ
                </button>
              </td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>

      {deleteConfirmation && (
        <div className='delete-confirmation-popup'>
          <p>คุณต้องการลบ Product นี้ใช่หรือไม่?</p>
          <button onClick={handleConfirmDelete} className='btn btn-danger'>
            ยืนยัน
          </button>
          <button onClick={handleCancelDelete} className='btn btn-secondary'>
            ยกเลิก
          </button>
        </div>
      )}

      <ul className='pagination'>
        {Array.from({ length: Math.ceil(products.length / itemsPerPage) }, (_, index) => (
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

export default ProductList;
