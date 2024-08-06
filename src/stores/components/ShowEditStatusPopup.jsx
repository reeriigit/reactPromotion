import React from 'react';

const ShowEditStatusPopup = ({
  showEditStatusPopup,
  selectedPurchaseOrderForEdit,
  selectedStatus,
  setSelectedStatus,
  handleSaveStatus,
  handleCloseEditStatusPopup
}) => {
  if (!showEditStatusPopup) return null;

  return (
    <div className='popup'>
      <div className='popup-content'>
        <h3>Edit Status for Purchase Order {selectedPurchaseOrderForEdit}</h3>
        <div>
          <label>
            <input
              type="radio"
              value="1"
              checked={selectedStatus === 1}
              onChange={() => setSelectedStatus(1)}
            />
            รอการชำระ
          </label>
          <label>
            <input
              type="radio"
              value="2"
              checked={selectedStatus === 2}
              onChange={() => setSelectedStatus(2)}
            />
            ยกเลิก
          </label>
          <label>
            <input
              type="radio"
              value="3"
              checked={selectedStatus === 3}
              onChange={() => setSelectedStatus(3)}
            />
            ชำระเเล้ว
          </label>
        </div>
        <button onClick={handleSaveStatus} className='btn btn-success'>บันทึก</button>
        <button onClick={handleCloseEditStatusPopup} className='btn btn-danger'>ปิด</button>
      </div>
    </div>
  );
};

export default ShowEditStatusPopup;
