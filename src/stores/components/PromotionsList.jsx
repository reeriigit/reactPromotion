import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import '../css/Page.css'

const PromotionsList = ({ onchangeUpdate,storeId }) => {
  const [promotions, setPromotions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [selectedPromotion, setSelectedPromotion] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get(`/promotions/${storeId}`);
      setPromotions(response.data);
    } catch (error) {
      console.error('Error fetching promotions:', error);
    }
  };

  fetchData();
}, [storeId]);

  
  

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = promotions.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleReadMore = (promotion) => {
    setSelectedPromotion(promotion);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleDelete = (promotionId) => {
    setDeleteConfirmation(true);
    setSelectedPromotion(promotionId);
  };

  const handleConfirmDelete = () => {
    axios
      .delete(`/deletePromotion/${selectedPromotion}`)
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
    setSelectedPromotion(null);
  };

  return (
    <div className='containerlist'>
      <h2>รายการโปรโมชั่น</h2>
      <MDBTable>
        <MDBTableHead>
          <tr>
            <th>รูป</th>
            <th>ชื่อโปร</th>
            <th>ประเภท</th>
            <th>คำอธิบาย</th>
            <th>จำนวนโปร</th>
            <th>เริ่ม</th>
            <th>จบ</th>
            <th>Action</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {currentItems.map((promotion) => (
            <tr key={promotion.promo_id}>
              <td>
                <img
                  src={`/proimages/${promotion.proimage}`}
                  alt=''
                  style={{ borderRadius: '10px', width: '70px', height: '70px' }}
                  className='rounded'
                />
              </td>
              <td>{promotion.promo_name}</td>
              <td>{promotion.promo_type_name}</td>
              <td>
                <button className='buttondes' onClick={() => handleReadMore(promotion)}>
                  อ่าน
                </button>
                {selectedPromotion === promotion && showPopup && (
                  <div className='popup'>
                    <div className='detail'>
                      <p>{promotion.promo_name}</p>
                      <p>ประเภทโปรโมชั่น : {promotion.promo_type_name}</p>
                      <p>จำนวนโปรโมชั่นที่สามารถใช้ได้ : {promotion.amountuse}</p>
                      <p>
                        {promotion.promo_type_name} {promotion.amountgiven}
                        {promotion.valuegiven_name_tb}
                      </p>
                      <p>เงือนไข : {promotion.amountcon} {promotion.valuecon_name_tb}</p>
                      <p>เริ่ม : {promotion.startdate} ถึง : {promotion.enddate}</p>
                    </div>
                    <p>คำอธิบาย : {promotion.promo_dec}</p>
                    <button onClick={handleClosePopup}>ปิด</button>
                  </div>
                )}
              </td>
              <td>{promotion.amountuse}</td>
              <td>
                <b style={{ color: 'green' }}>{promotion.startdate}</b>
              </td>
              <td>
                <b style={{ color: 'orange' }}>{promotion.enddate}</b>
              </td>
              <td>
                <button onClick={() => onchangeUpdate(promotion.promo_id)} className='btn btn-success btndel'>
                  Update
                </button>
                <button onClick={() => handleDelete(promotion.promo_id)} className='btn btn-danger btndel'>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>

      {deleteConfirmation && (
        <div className='delete-confirmation-popup'>
          <p>คุณต้องการลบโปรโมชั่นนี้ใช่หรือไม่?</p>
          <button onClick={handleConfirmDelete} className='btn btn-danger'>
            ยืนยัน
          </button>
          <button onClick={handleCancelDelete} className='btn btn-secondary'>
            ยกเลิก
          </button>
        </div>
      )}

      <ul className='pagination'>
        {Array.from({ length: Math.ceil(promotions.length / itemsPerPage) }, (_, index) => (
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

export default PromotionsList;
