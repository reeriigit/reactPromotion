// Promotion.jsx

import '../css/Promotion.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import InsertPromotion from '../components/InsertPromotion';
import PromotionsList from '../components/PromotionsList';
import { MDBCol } from "mdbreact";
import UpdatePromotion from '../components/UpdatePromotion';

function Promotion() {
  const [activeComponent, setActiveComponent] = useState('PromotionsList');
  const { user_id } = useParams();
  const navigate = useNavigate();
  const [data, setStore] = useState(null);
  const [promo_id, setPromoId] = useState(null);

  const handleButtonClick = (component) => {
    setActiveComponent(component);
  };

  useEffect(() => {
    axios.get(`/get_stores_check/${user_id}`)
      .then((res) => {
        setStore(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, [user_id]);

  const handleInsertPromotionSuccess = () => {
    navigate(`/stores/promotions/${user_id}`);
    window.location.reload();
  };

  const onchangeUpdate = (promo_id) => {
    setPromoId(promo_id);
    console.log("fuck you2 ",promo_id);
    setActiveComponent('UpdatePromotion');
  };

  return (
    <>
      <div className="bgpro">
        <div className='barsearch'>
          <MDBCol md="6">
          
            <input className="form-control" type="text" placeholder="Search" aria-label="Search" />
          </MDBCol>
        </div>
        <div className="barbutton">
          <button
            onClick={() => handleButtonClick('PromotionsList')}
            className={activeComponent === 'PromotionsList' ? 'active' : ''}
          >
            รายการโปรโมชั่น 
          </button>
          <button
            onClick={() => handleButtonClick('UpdatePromotion')}
            className={activeComponent === 'UpdatePromotion' ? 'active' : ''}
          >
            เเก้ไขโปรโมชั่น 
          </button>
          <button
            onClick={() => handleButtonClick('OtherComponent')}
            className={activeComponent === 'OtherComponent' ? 'active' : ''}
          >
            OtherComponent
          </button>
          <button
            onClick={() => handleButtonClick('InsertPromotion')}
            className={activeComponent === 'InsertPromotion' ? 'active' : ''}
          >
            + เพิ่มโปรโมชั่น 
          </button>
        </div>
        <div className='datapushpro'>
          {activeComponent === 'PromotionsList' && <PromotionsList storeId={data && data.storeId} onchangeUpdate={onchangeUpdate} />}
          {activeComponent === 'InsertPromotion' && <InsertPromotion storeId={data && data.storeId} user_id={user_id} onInsertSuccess={handleInsertPromotionSuccess} />}
          {activeComponent === 'UpdatePromotion' && <UpdatePromotion promo_id={promo_id} onInsertSuccess={handleInsertPromotionSuccess} />}
        </div>
      </div>
    </>
  );
}

export default Promotion;
