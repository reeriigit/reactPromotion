import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [data, setData] = useState([]);
  const [deleted, setDeleted] = useState(true);

  useEffect(() => {
    if (deleted) {
      setDeleted(false);
    
    axios.get('/stores') // Assuming the correct API endpoint
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));  // Fix here: Use console.error instead of console.log
    }
  }, [deleted]);

  function handDelete(storeId) {
    axios.delete(`/delete_stores/${storeId}`)
      .then((res) => {
        setDeleted(true);
      })
      .catch((err) => console.log(err));  // Fix here: Use console.error instead of console.log
  }

  return (
    <div className="container-fluid bg-primary vh-100 vm-100">
      <h3>Stores</h3>
      <div className="d-flex justify-content-end">
        <Link className="btn btn-success" to='/create'>Add Store</Link>
      </div>
      <table>
        <thead>
          <tr>
            <th>logo</th>
            <th>storeId</th>
            <th>storeName</th>
            <th>storeType</th>
            <th>storeDes</th>
            <th>email</th>
            <th>pass</th>
            <th>phone</th>
            <th>address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
  {data.map((store) => (
    <tr key={store.storeId}>
      <img
  src={`images/${store.logo}`}
  alt="Logo"
  style={{ maxWidth: '50px', maxHeight: '50px' }}
/>

      <td>{store.storeId}</td>
      <td>{store.storeName}</td>
      <td>{store.storeType}</td>
      <td>{store.storeDes}</td>
      <td>{store.email}</td>
      <td>{store.pass}</td>
      <td>{store.phone}</td>
      <td>{store.address}</td>
      <td>
        <Link className="btn btn-success" to={`/read/${store.storeId}`}>Read</Link>
        <Link className="btn btn-success" to={`/edit/${store.storeId}`}>Edit</Link>
        <button onClick={() => handDelete(store.storeId)} className="btn btn-danger">Delete</button>
      </td>
    </tr>
  ))}
</tbody>
      </table>
    </div>
  );
}

export default Home;
