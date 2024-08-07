import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import '../css/SetPromotion.css';

const SetPromotionList = ({ onchangeUpdate, storeId }) => {
  const [setPromotions, setSetPromotions] = useState([]);
  const [selectedPromotions, setSelectedPromotions] = useState([]);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [selectedPromotion, setSelectedPromotion] = useState(null);
  const [showDescriptionPopup, setShowDescriptionPopup] = useState(false);

  useEffect(() => {
    const fetchSetPromotions = async () => {
      try {
        const response = await axios.get(`/set_promotions_join/${storeId}`);
        setSetPromotions(response.data);
        console.log("join", response.data);
      } catch (error) {
        console.error('Error fetching set promotions:', error);
      }
    };

    fetchSetPromotions();
  }, [storeId]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = setPromotions.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleCheckboxChange = (promotionId) => {
    if (selectedPromotions.includes(promotionId)) {
      setSelectedPromotions(selectedPromotions.filter((id) => id !== promotionId));
    } else {
      setSelectedPromotions([...selectedPromotions, promotionId]);
    }
  };

  const handleDeleteClick = () => {
    setDeleteConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.post('/deleteSetPromotions', { ids: selectedPromotions });
      setSetPromotions(setPromotions.filter((promo) => !selectedPromotions.includes(promo.set_promotion_id)));
      setSelectedPromotions([]);
      setDeleteConfirmation(false);
    } catch (error) {
      console.error('Error deleting set promotions:', error);
    }
  };

  const handleCancelDelete = () => {
    setDeleteConfirmation(false);
  };

  const handleReadMore = (promotion) => {
    setSelectedPromotion(promotion);
    setShowDescriptionPopup(true);
  };

  const handleClosePopup = () => {
    setShowDescriptionPopup(false);
  };

  return (
    <div>
      <h2>ทำโปรโมชั่น</h2>
      <MDBTable>
        <MDBTableHead>
          <tr>
            <th>เลือก</th>
            <th>#</th>
            <th>รูป</th>
            <th>โปรโมชั่น</th>
            <th>สินค้า</th>
            <th></th>
            <th>Actions</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {currentItems.map((promotion, index) => {
            let images = [];
            try {
              images = JSON.parse(promotion.images);
            } catch (e) {
              console.error('Error parsing images:', e);
            }

            return (
              <tr key={promotion.set_promotion_id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedPromotions.includes(promotion.set_promotion_id)}
                    onChange={() => handleCheckboxChange(promotion.set_promotion_id)}
                  />
                </td>
                <td>{index + 1}</td>
                <td>
                  {images.length > 0 && (
                    <img
                      src={`/productimages/${images[0]}`}
                      alt={promotion.name}
                      style={{ borderRadius: '10px', width: '70px', height: '70px', cursor: 'pointer' }}
                      className='rounded'
                    />
                  )}
                </td>
                <td>{promotion.promo_name}</td>
                <td>{promotion.name}</td>
                <td>
                  <button className='buttondes' onClick={() => handleReadMore(promotion)}>
                    อ่าน
                  </button>
                </td>
                <td>
                  <button onClick={() => onchangeUpdate(promotion.set_promotion_id)} className="btn btn-success">
                    แก้ไข
                  </button>
                </td>
              </tr>
            );
          })}
        </MDBTableBody>
      </MDBTable>

      {showDescriptionPopup && selectedPromotion && (
        <div className="popup">
          <div className="detail">
            <p>สินค้า: {selectedPromotion.name}</p>
            <p>ราคา: {selectedPromotion.price} บาท</p>
            <p>ต้นทุ่น: {selectedPromotion.cost_price} บาท</p>
            <p>Description: {selectedPromotion.description}</p>
            <hr />
            <p>โปรโมชั่น: {selectedPromotion.promo_name}</p>
            <p>โปรโมชั่น: {selectedPromotion.promo_type_name}</p>
            <hr />
            <p>เงื่อนไข</p>
            <p>จำนวนที่ต้องซื้อ {selectedPromotion.amountcon} {selectedPromotion.valuecon_name}</p>
            <p>เริ่ม: {selectedPromotion.startdate} ถึง : {selectedPromotion.enddate}</p>
            <hr />
            <p>สิ่งที่ให้กับโปรโมชั่น</p>
            <p>จำนวนโปรโมชั่นคงเหลือ: {selectedPromotion.amountuse}</p>
            <p>จำนวนที่ได้: {selectedPromotion.amountgiven} {selectedPromotion.valuegiven_name}</p>
          </div>
          <button onClick={handleClosePopup}>
            ปิด
          </button>
        </div>
      )}

      {deleteConfirmation && (
        <div className="delete-confirmation-popup">
          <p>คุณต้องการลบ Promotion ที่เลือกใช่หรือไม่?</p>
          <button onClick={handleConfirmDelete} className="btn btn-danger">
            ยืนยัน
          </button>
          <button onClick={handleCancelDelete} className="btn btn-secondary">
            ยกเลิก
          </button>
        </div>
      )}

      <ul className="pagination">
        {Array.from({ length: Math.ceil(setPromotions.length / itemsPerPage) }, (_, index) => (
          <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
            <button onClick={() => paginate(index + 1)} className="page-link">
              {index + 1}
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleDeleteClick} className="btn btn-danger" disabled={selectedPromotions.length === 0}>
        ลบที่เลือก
      </button>
    </div>
  );
};

export default SetPromotionList;
