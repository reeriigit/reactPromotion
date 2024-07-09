import { useParams } from 'react-router-dom';
import '../css/Setting.css';
import Notifications from '../components/Notifications';
import EditStore from '../components/EditStore';
import { FaStoreAlt } from 'react-icons/fa';
import React, { useState, useEffect } from "react";
import axios from "axios";
import UploadImageForm from '../components/UploadImageForm';

function StoreDetail() {
  const [activeComponent, setActiveComponent] = useState('StoreProfile');
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
              <button onClick={() => handleButtonClick('StoreProfile')}> <FaStoreAlt /> โปรไฟล์ ร้านค้า</button>
            </div>
            <div>
              <button onClick={() => handleButtonClick('UploadImagesStore')}> <FaStoreAlt /> อัพโหลดรูปภาพร้านค้า</button>
            </div>
            <div>
              <button onClick={() => handleButtonClick('Notifications')}>Notifications</button>
            </div>
          </div>
          <div className="cols">
            {activeComponent === 'StoreProfile' && <EditStore user_id={user_id} />}
            {activeComponent === 'UploadImagesStore' && <UploadImageForm storeId={data.storeId} />}
            {activeComponent === 'Notifications' && <Notifications />}
          </div>
        </div>
      </div>
    </>
  );
}

export default StoreDetail;
