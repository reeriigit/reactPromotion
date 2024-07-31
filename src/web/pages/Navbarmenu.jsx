import React, { useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import { MDBCol } from 'mdbreact';
import imagelogoupro from '../imgs/Logoupro.png';
import Popuser from '../component/Popuser';

function Navbarmenu() {
  const { user_id } = useParams();
  const [showPopup, setShowPopup] = useState(false);
  const [showPopupuser, setShowPopupuser] = useState(false);
  const navigate = useNavigate();

  const togglePopup = () => {
    if(user_id){
      setShowPopupuser(!showPopupuser);
    }else{
      setShowPopup(!showPopup);
      
    }
    
  };
  console.log("menubar",user_id)

  const handleLoginClick = () => {
    navigate('/web/login');
  };
 

  return (
    <div className="Navbarmenu">
      <div className="menubar">
        <div className="logo item">
          <img src={imagelogoupro} alt="logoupro" />
        </div>
        <div className="item">โปรโมชั่น</div>
        <div className="item">ประเภทโปรโมชั่น</div>
        <div className="item">ร้านค้า</div>
        <div className="item">ติดต่อ</div>
        <MDBCol md="2">
          <input className="form-control" type="text" placeholder="Search" aria-label="Search" />
        </MDBCol>
        <div className="username item" onClick={togglePopup}> {user_id}</div>
      </div>
      <div className="menudetail"></div>
      {showPopupuser && (
        <Popuser user_id={user_id}/>
      )}

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <span className="close-btn" onClick={togglePopup}>&times;</span>
            <button onClick={handleLoginClick}>เข้าสู่ระบบ</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbarmenu;
