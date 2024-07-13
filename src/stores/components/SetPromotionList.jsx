import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

const SetPromotionList = ({ onchangeUpdate, storeId }) => {
  const [setPromotions, setSetPromotions] = useState([]);
  const [selectedPromotions, setSelectedPromotions] = useState([]);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Set number of items per page

  useEffect(() => {
    const fetchSetPromotions = async () => {
      try {
        const response = await axios.get(`/set_promotions/${storeId}`);
        setSetPromotions(response.data);
      } catch (error) {
        console.error('Error fetching set promotions:', error);
      }
    };

    fetchSetPromotions();
  }, [storeId]);

  // Pagination logic
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

  return (
    <div>
      <h2>Set Promotions List</h2>
      <MDBTable>
        <MDBTableHead>
          <tr>
            <th>Select</th>
            <th>#</th>
            <th>Promo ID</th>
            <th>Product ID</th>
            <th>Store ID</th>
            <th>Actions</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {currentItems.map((promotion, index) => (
            <tr key={promotion.set_promotion_id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedPromotions.includes(promotion.set_promotion_id)}
                  onChange={() => handleCheckboxChange(promotion.set_promotion_id)}
                />
              </td>
              <td>{index + 1}</td>
              <td>{promotion.promo_id}</td>
              <td>{promotion.product_id}</td>
              <td>{promotion.storeId}</td>
              <td>
              <button onClick={() => onchangeUpdate(promotion.set_promotion_id)} className="btn btn-success btndel">
                  แก้ไข
              </button>
              </td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
     

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

      <ul className='pagination'>
        {Array.from({ length: Math.ceil(setPromotions.length / itemsPerPage) }, (_, index) => (
          <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
            <button onClick={() => paginate(index + 1)} className='page-link'>
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
