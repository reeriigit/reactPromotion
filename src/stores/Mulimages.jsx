import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ImageUploadForm from "./ImageUploadForm";

function Mulimages() {
  const { email, pass } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`/get_stores_check/${email}/${pass}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.error(err));
  }, [email, pass]);

  return (
    <div className="container-fluid bg-primary vh-100 vm-100">
      <h3>Stores</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Logo</th>
            <th>Store ID</th>
            <th>Store Name</th>
            <th>Store Type</th>
            <th>Store Description</th>
            <th>Email</th>
            <th>Password</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((store) => (
            <tr key={store.storeId}>
              <td>
                <img
                  src={`/images/${store.logo}`}
                  alt={`Logo of ${store.storeName}`}
                  style={{ maxWidth: '50px', maxHeight: '50px' }}
                />
              </td>
              <td>{store.storeId}</td>
              <td>{store.storeName}</td>
              <td>{store.storeType}</td>
              <td>{store.storeDes}</td>
              <td>{store.email}</td>
              <td>{store.pass}</td>
              <td>{store.phone}</td>
              <td>{store.address}</td>
              <td>
                <Link className="btn btn-success" to={`/stores/editstore/${store.storeId}`}>Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ImageUploadForm/>
    </div>
  );
}

export default Mulimages;
