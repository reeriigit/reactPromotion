// Promotion.jsx

import '../css/Promotion.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { MDBCol } from "mdbreact";
import ProductTypeList from '../components/ProductTypeList';
import InsertProductType from '../components/InsertProductType';
import UpdateProductType from '../components/UpdateProductType';

function Product() {
  const [activeComponent, setActiveComponent] = useState('ProductTypeList');
  const { user_id } = useParams();
  const navigate = useNavigate();
  const [data, setStore] = useState(null);
  const [product_type_id, setProType] = useState(null);

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
    navigate(`/stores/producttype/${user_id}`);
    window.location.reload();
  };

  const onchangeUpdate = (product_type_id) => {
    setProType(product_type_id);
    console.log("fuck you2 ",product_type_id);
    setActiveComponent('UpdateProductType');
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
            onClick={() => handleButtonClick('ProductTypeList')}
            className={activeComponent === 'ProductTypeList' ? 'active' : ''}
          >
            รายการประเภทสินค้า 
          </button>
          <button
            onClick={() => handleButtonClick('UpdateProductType')}
            className={activeComponent === 'UpdateProductType' ? 'active' : ''}
          >
            เเก้ไขประเภทสินค้า
          </button>
          <button
            onClick={() => handleButtonClick('OtherComponent')}
            className={activeComponent === 'OtherComponent' ? 'active' : ''}
          >
            OtherComponent
          </button>
          <button
            onClick={() => handleButtonClick('InsertProductType')}
            className={activeComponent === 'InsertProductType' ? 'active' : ''}
          >
            + เพิ่ม ประเภทสินค้า
          </button>
        </div>
        <div className='datapushpro'>
          {activeComponent === 'ProductTypeList' && <ProductTypeList storeId={data && data.storeId} onchangeUpdate={onchangeUpdate} />}
          {activeComponent === 'InsertProductType' && <InsertProductType storeId={data && data.storeId} user_id={user_id} onInsertSuccess={handleInsertPromotionSuccess} />}
          {activeComponent === 'UpdateProductType' && <UpdateProductType product_type_id={product_type_id} onUpdateSuccess={handleInsertPromotionSuccess} />}
        </div>
      </div>
    </>
  );
}

export default Product;
