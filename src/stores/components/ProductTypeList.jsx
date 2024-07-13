import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import '../css/Page.css'

const ProductTypeList = ({ onchangeUpdate, storeId }) => {
  const [productTypes, setProductTypes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [selectedProductType, setSelectedProductType] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/producttype/${storeId}`);
        setProductTypes(response.data);
      } catch (error) {
        console.error('Error fetching product types:', error);
      }
    };

    fetchData();
  }, [storeId]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = productTypes.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleReadMore = (productType) => {
    setSelectedProductType(productType);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleDelete = (productTypeId) => {
    setDeleteConfirmation(true);
    setSelectedProductType(productTypeId);
  };

  const handleConfirmDelete = () => {
    axios
      .delete(`/deleteProductType/${selectedProductType}`)
      .then(() => {
        setDeleteConfirmation(false);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        setDeleteConfirmation(false);
      });
  };

  const handleCancelDelete = () => {
    setDeleteConfirmation(false);
    setSelectedProductType(null);
  };

  return (
    <div className='containerlist'>
      <h2>รายการประเภทสินค้า</h2>
      <MDBTable>
        <MDBTableHead>
          <tr>
            <th>ID</th>
            <th>รูป</th>
            <th>ID store {storeId}</th>
            <th>ชื่อ</th>
            <th>คำอธิบาย</th>
            <th>Action</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {currentItems.map((productType) => (
            <tr key={productType.product_type_id}>
              <td>{productType.product_type_id}</td>
              <td>
                <img
                  src={`/producttypeimages/${productType.product_type_image}`}
                  alt=''
                  style={{ borderRadius: '10px', width: '70px', height: '70px' }}
                  className='rounded'
                />
              </td>
              <td>{productType.storeId}</td>
              <td>{productType.product_type_name}</td>
              <td>
                <button className='buttondes' onClick={() => handleReadMore(productType)}>
                  อ่าน
                </button>
                {selectedProductType === productType && showPopup && (
                  <div className='popup'>
                    <div className='detail'>
                      อธิบายยยยยย
                    </div>
                    <p>Description: {productType.description}</p>
                    <button onClick={handleClosePopup}>ปิด</button>
                  </div>
                )}
              </td>

              <td>
                <button onClick={() => onchangeUpdate(productType.product_type_id)} className='btn btn-success btndel'>
                  เเก้ไข
                </button>
                <button onClick={() => handleDelete(productType.product_type_id)} className='btn btn-danger btndel'>
                  ลบ
                </button>
              </td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>

      {deleteConfirmation && (
        <div className='delete-confirmation-popup'>
          <p>คุณต้องการลบ Product Type นี้ใช่หรือไม่?</p>
          <button onClick={handleConfirmDelete} className='btn btn-danger'>
            ยืนยัน
          </button>
          <button onClick={handleCancelDelete} className='btn btn-secondary'>
            ยกเลิก
          </button>
        </div>
      )}

      <ul className='pagination'>
        {Array.from({ length: Math.ceil(productTypes.length / itemsPerPage) }, (_, index) => (
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

export default ProductTypeList;
