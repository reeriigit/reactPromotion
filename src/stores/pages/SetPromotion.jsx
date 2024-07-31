// SetPromotion.jsx

import '../css/Promotion.css';
import '../css/SetPromotion.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { MDBCol } from "mdbreact";
import SetPromotionList from '../components/SetPromotionList';
import InsertSetPromotion from '../components/InsertSetPromotion';
import UpdateSetPromotion from '../components/UpdateSetPromotion';

function SetPromotion() {
  const [activeComponent, setActiveComponent] = useState('SetPromotionList');
  const { user_id } = useParams();
  const navigate = useNavigate();
  const [data, setStore] = useState(null);
  const [set_promotion_id, setSetPromotionId] = useState(null);

  const handleButtonClick = (component) => {
    setActiveComponent(component);
  };

  useEffect(() => {
    axios.get(`/get_stores_check/${user_id}`)
      .then((res) => {
        setStore(res.data[0]);
      })
      .catch((err) => console.log("i heare", err));
  }, [user_id]);

  const handleInsertSetPromotionSuccess = () => {
    navigate(`/stores/setpromotion/${user_id}`);
    window.location.reload();
  };

  const onchangeUpdate = (set_promotion_id) => {
    setSetPromotionId(set_promotion_id);
    console.log("fuck you2 ",set_promotion_id);
    setActiveComponent('UpdateSetPromotion');
  };

  return (
    <>
      <div className="bgpro insertform">
        <div className='barsearch'>
          <MDBCol md="6">
            <input className="form-control" type="text" placeholder="Search" aria-label="Search" />
          </MDBCol>
        </div>
        <div className="barbutton">
          <button
            onClick={() => handleButtonClick('SetPromotionList')}
            className={activeComponent === 'SetPromotionList' ? 'active' : ''}
          >
            รายการโปรโมชั่น
          </button>
          <button
            onClick={() => handleButtonClick('UpdateSetPromotion')}
            className={activeComponent === 'UpdateSetPromotion' ? 'active' : ''}
          >
            แก้ไขโปรโมชั่น
          </button>
          <button
            onClick={() => handleButtonClick('InsertSetPromotion')}
            className={activeComponent === 'InsertSetPromotion' ? 'active' : ''}
          >
            + เพิ่มโปรโมชั่น
          </button>
        </div>
        <div className='datapushpro'>
        {activeComponent === 'SetPromotionList' && <SetPromotionList storeId={data && data.storeId} onchangeUpdate={onchangeUpdate} />}
          {activeComponent === 'InsertSetPromotion' && <InsertSetPromotion storeId={data && data.storeId} user_id={user_id} onInsertSuccess={handleInsertSetPromotionSuccess} />}
          {activeComponent === 'UpdateSetPromotion' && <UpdateSetPromotion storeId={data && data.storeId} set_promotion_id={set_promotion_id} onUpdateSuccess={handleInsertSetPromotionSuccess} />}
          
        </div>
      </div>
    </>
  );
}

export default SetPromotion;
