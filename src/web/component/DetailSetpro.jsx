import React from 'react';
import { useNavigate } from 'react-router-dom';
import './css/DetailSetpro.css';
import Cupon from './css/cupon.png';

function DetailSetpro({ user_id, selectedProduct, handleClosePopup }) {
  let images = [];
  try {
    images = JSON.parse(selectedProduct.images);
  } catch (e) {
    console.error('Error parsing images:', e);
  }
  console.log("setPro",user_id.user_id)
  console.log("selectedProduct",selectedProduct)
  const  storeId = selectedProduct.storeId;
  console.log("storeId",storeId);
  const set_promotion_id = selectedProduct.set_promotion_id;
  console.log("set_promotion_id",set_promotion_id);
  const navigate = useNavigate();

  const handleOrderClick = () => {
    user_id = user_id.user_id;
    navigate('/web/todolist', { state: { storeId, user_id,set_promotion_id } });

  };

  return (
    <div className="popup">
      <div className="popup-content item">
        <div className="gridlayer">
          {images.length > 0 && (
            <img src={`/productimages/${images[0]}`} alt={selectedProduct.name} />
          )}
          <div className="img-item">
            {images.length > 0 && (
              <>
                <img src={`/productimages/${images[1]}`} alt={selectedProduct.name} />
                <img src={`/productimages/${images[2]}`} alt={selectedProduct.name} />
              </>
            )}
          </div>
        </div>
        <div className="datapro">
          <div className="item">
            <b>{selectedProduct.name}</b>
            <p style={{ fontSize: '12px' }}>{selectedProduct.product_type_name}</p>
          </div>
          <div className="item">
            <b>{selectedProduct.promo_name}&nbsp;&nbsp;</b>
            <p className='price'>฿{selectedProduct.price}&nbsp;&nbsp;</p>
            <p>เปิดอยู่ จนถึง 23:25:00</p>
          </div>
        </div>
        <div className="action">
          <button className='cart'>ตะกร้า</button>
          <button className='buy' onClick={handleOrderClick}>สั่งซื้อ</button>
        </div>
      </div>
      <div className="detailpro item">
        <span className="close" onClick={handleClosePopup}>&nbsp;&times;&nbsp;</span>
        <div className="datadetail">
          <div className="showimageset">
            <div>
              <img src={`/productimages/${images[1]}`} alt={selectedProduct.name} />
              <span>{selectedProduct.amountcon}{selectedProduct.valuecon_name}</span>
            </div>
            {selectedProduct.promo_type === 1 && (<span>ลด</span>)}
            {selectedProduct.promo_type === 2 && (<span>เเถม</span>)}
            {selectedProduct.promo_type === 3 && (<span>เเต้ม</span>)}
            <div>
              <img src={`/productimages/${images[1]}`} alt={selectedProduct.name} />
              <span>{selectedProduct.amountgiven}{selectedProduct.valuegiven_name}</span>
            </div>
          </div>
          โปรโมชั่น{selectedProduct.promo_type_name}
          <div className="showpromotion">
            <div>
              <img src={Cupon} alt="description" />
              <span className='amountcon'>ซื้อ {selectedProduct.amountcon}</span>
              {selectedProduct.promo_type === 1 && (<span className='promotype'>ลด {selectedProduct.amountgiven} {selectedProduct.valuegiven_name}</span>)}
              {selectedProduct.promo_type === 2 && (<span className='promotype'>เเถม {selectedProduct.amountgiven} {selectedProduct.valuegiven_name}</span>)}
              {selectedProduct.promo_type === 3 && (<span className='promotype'>เเต้ม {selectedProduct.amountgiven} {selectedProduct.valuegiven_name}</span>)}
            </div>
          </div>
          <div className="dataaddress">
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailSetpro;
