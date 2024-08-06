import '../css/Promotion.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { MDBCol } from "mdbreact";
import Orderlist from '../components/Orderlist';
import InsertProduct from '../components/InsertProduct';
import UpdateProduct from '../components/UpdateProduct';
import { QrReader } from 'react-qr-reader'; // Corrected import for QR code reader
import '../css/Listoforderers.css';

function Listoforderers() {
  const [activeComponent, setActiveComponent] = useState('Orderlist');
  const { user_id } = useParams();
  const navigate = useNavigate();
  const [data, setStore] = useState(null);
  const [product_id, setProductId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showScanner, setShowScanner] = useState(false);

  const handleButtonClick = (component) => {
    setActiveComponent(component);
  };

  useEffect(() => {
    axios.get(`/get_stores_check/${user_id}`)
      .then((res) => {
        setStore(res.data[0]);
      })
      .catch((err) => console.log("Error fetching store data", err));
  }, [user_id]);

  const handleInsertProductSuccess = () => {
    navigate(`/stores/product/${user_id}`);
    window.location.reload();
  };

  const onchangeUpdate = (product_id) => {
    setProductId(product_id);
    console.log("Product ID: ", product_id);
    setActiveComponent('UpdateProduct');
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleScan = (data) => {
    if (data) {
      console.log("QR Code data: ", data);
      setSearchQuery(data);
      setShowScanner(false);
      // Exits the function, stopping further execution
    }

  };
  
  

  const handleError = (err) => {
    console.error(err);
  };

  return (
    <>
      <div className="bgpro">
        <div className='barsearch'>
          <MDBCol md="6">
            <input 
              className="form-control" 
              type="text" 
              placeholder="Search" 
              aria-label="Search" 
              value={searchQuery} 
              onChange={handleSearchChange} 
            />
          </MDBCol>
          <button onClick={() => setShowScanner(true)}>สเเกน</button>
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
          {activeComponent === 'Orderlist' && <Orderlist storeId={data && data.storeId} searchQuery={searchQuery} onchangeUpdate={onchangeUpdate} />}
          {activeComponent === 'InsertProduct' && <InsertProduct storeId={data && data.storeId} user_id={user_id} onInsertSuccess={handleInsertProductSuccess} />}
          {activeComponent === 'UpdateProduct' && <UpdateProduct storeId={data && data.storeId} product_id={product_id} onUpdateSuccess={handleInsertProductSuccess} />}
        </div>
        {showScanner && (
          <div className="scanner-overlay">
            <div className="scanner-modal">
              <QrReader
                onResult={(result, error) => {
                  if (result) {
                    handleScan(result.getText());
                    
                  }
                  if (error) {
                    handleError(error);
                  }
                }}
                constraints={{ facingMode: 'environment' }}
                style={{ width: '100%' }}
              />
              <button className="close-button" onClick={() => setShowScanner(false)}>Close Scanner</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Listoforderers;
