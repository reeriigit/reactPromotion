import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ImageUploadForm from "./ImageUploadForm";

function Mulimages() {
  const { user_id } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`/get_stores_check/${user_id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.error(err));
  }, [user_id]);

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Stores</h3>

      {data.map((store) => (
        <div key={store.storeId} className="mb-4">
          <div className="text-center">
            <img
              src={`/images/${store.logo}`}
              alt={`Logo of ${store.storeName}`}
              className="img-fluid"
              style={{ maxWidth: '100px', maxHeight: '100px' }}
            />
          </div>
          <div className="mt-2">
            <strong>Store ID:</strong> {store.storeId}
          </div>
          <div>
            <strong>Store Name:</strong> {store.storeName}
          </div>
          <div>
            <strong>Store Type:</strong> {store.storeType}
          </div>
          <div>
            <strong>Store Description:</strong> {store.storeDes}
          </div>
          <div>
            <strong>Email:</strong> {store.email}
          </div>
          <div>
            <strong>Password:</strong> {store.pass}
          </div>
          <div>
            <strong>Phone:</strong> {store.phone}
          </div>
          <div>
            <strong>Address:</strong> {store.address}
          </div>
          <div className="mt-2">
            <Link className="btn btn-success" to={`/stores/editstore/${store.storeId}`}>Edit</Link>
          </div>
        </div>
      ))}

      {data.map((store) => (
        <ImageUploadForm key={store.storeId} paramId={store.storeId} />
      ))}
    </div>
  );
}

export default Mulimages;
