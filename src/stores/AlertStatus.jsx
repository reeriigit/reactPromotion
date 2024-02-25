import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ImageUploadForm from "./ImageUploadForm";
import "./css/AlertStatus.css";

function AlertStatus() {
  const { email, pass } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`/get_stores_check/${email}/${pass}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.error(err));
  }, [email, pass]);

  // Access the first element directly (assuming there is only one store)
  const store = data[0] || {};

  return (
    <div className="containerprofile">
      <h3>Store</h3>
      <div className="profile">
        <img
          className="logo"
          src={`/images/${store.logo}`}
          alt={`Logo of ${store.storeName}`}
          style={{ maxWidth: '50px', maxHeight: '50px' }}
        />
        <div className="bardata">
          <div>{store.storeName}</div>
          <div>{store.storeName}</div>
          <div>{store.storeName}</div>
          <div>{store.storeName}</div>
          <div>{store.storeName}</div>
          <Link className="btn btn-success" to={`/stores/editstore/${store.storeId}`}>Edit</Link>
          

        </div>
        <ImageUploadForm key={store.storeId} paramId={store.storeId} />
        
      </div>

      
      
    </div>
  );
}

export default AlertStatus;
