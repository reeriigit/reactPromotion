import { useParams } from 'react-router-dom';
import '../css/Setting.css';
import Notifications from '../components/Notifications';
import EditUser from '../components/EditUser';
import EditStore from '../components/EditStore';
import { FaUserAlt, FaStoreAlt } from 'react-icons/fa';
import React, { useState, useEffect } from "react";
import axios from "axios";
import ComponentStore from '../components/ComponentStore';

function Settings() {
  const [activeComponent, setActiveComponent] = useState('ProfileUser');
  const { user_id } = useParams();
  const [data, setStore] = useState(null);

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

  return (
    <>
      <div className="consetting">
      
        <div className="rowset">
          
          <div className="cols">
            <div className='logoUser'>
            {data && data.logo && (
            <img src={`/images/${data.logo}`} alt="Store Logo" className="img-fluid mt-2" style={{ maxWidth: '200px' }} />
          )}
            <div>
              <b><p>reeriisasam(reerriitiker)</p></b> 
              <p> Your personal account</p>
            </div>
            </div>
            <div>
              <button onClick={() => handleButtonClick('ProfileUser')}> <FaUserAlt /> โปรไฟล์ผู้ใช้ </button>
            </div>
            <div>
              <button onClick={() => handleButtonClick('StoreProfile')}> <FaStoreAlt /> โปรไฟล์ร้านค้า</button>
            </div>
            <div>
              <button onClick={() => handleButtonClick('ComponentStore')}>รายละอียด(โต๊ะ/ห้อง)</button>
            </div>
            <div>
              <button onClick={() => handleButtonClick('Notifications')}>Notifications</button>
            </div>
          </div>
          <div className="cols">
            {activeComponent === 'ProfileUser' && <EditUser user_id={user_id} />}
            {activeComponent === 'StoreProfile' && <EditStore user_id={user_id} />}
            {activeComponent === 'ComponentStore' && <ComponentStore user_id={user_id} />}
            {activeComponent === 'Notifications' && <Notifications />}
          </div>
        </div>
      </div>
    </>
  );
}

export default Settings;
