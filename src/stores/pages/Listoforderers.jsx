// Product.jsx

import '../css/Promotion.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { MDBCol } from "mdbreact";
import Orderlist from '../components/Orderlist';
import InsertProduct from '../components/InsertProduct';
import UpdateProduct from '../components/UpdateProduct';

function Listoforderers() {
  const [activeComponent, setActiveComponent] = useState('Orderlist');
  const { user_id } = useParams();
  const navigate = useNavigate();
  const [data, setStore] = useState(null);
  const [product_id, setProductId] = useState(null);

  const handleButtonClick = (component) => {
    setActiveComponent(component);
  };

  useEffect(() => {
    axios.get(`/get_stores_check/${user_id}`)
      .then((res) => {
        setStore(res.data[0]);
      })
      .catch((err) => console.log("i heare",err));
  }, [user_id]);

  const handleInsertProductSuccess = () => {
    navigate(`/stores/product/${user_id}`);
    window.location.reload();
  };

  const onchangeUpdate = (product_id) => {
    setProductId(product_id);
    console.log("fuck you2 ",product_id);
    setActiveComponent('UpdateProduct');
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
            onClick={() => handleButtonClick('Orderlist')}
            className={activeComponent === 'Orderlist' ? 'active' : ''}
          >
            รายการสินค้า
          </button>
          <button
            onClick={() => handleButtonClick('UpdateProduct')}
            className={activeComponent === 'UpdateProduct' ? 'active' : ''}
          >
            แก้ไขสินค้า
          </button>
          <button
            onClick={() => handleButtonClick('OtherComponent')}
            className={activeComponent === 'OtherComponent' ? 'active' : ''}
          >
            OtherComponent
          </button>
          <button
            onClick={() => handleButtonClick('InsertProduct')}
            className={activeComponent === 'InsertProduct' ? 'active' : ''}
          >
            + เพิ่มสินค้า
          </button>
        </div>
        <div className='datapushpro'>
          {activeComponent === 'Orderlist' && <Orderlist storeId={data && data.storeId} onchangeUpdate={onchangeUpdate} />}
          {activeComponent === 'InsertProduct' && <InsertProduct storeId={data && data.storeId} user_id={user_id} onInsertSuccess={handleInsertProductSuccess} />}
          {activeComponent === 'UpdateProduct' && <UpdateProduct storeId={data && data.storeId} product_id={product_id} onUpdateSuccess={handleInsertProductSuccess} />}
        </div>
      </div>
    </>
  );
}

export default Listoforderers;
