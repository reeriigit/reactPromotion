import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

function Edit() {
  const [data, setData] = useState({});
  const { storeId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/get_stores/${storeId}`)
      .then((res) => {
        setData(res.data[0]);  // Assuming your API returns an array and you want the first element
      })
      .catch((err) => console.log(err));
  }, [storeId]);

  function handleSubmit(e) {
    e.preventDefault();

    axios.put(`/edit_stores/${storeId}`, data)
      .then((res) => {
        navigate('/');
        console.log(res);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="container-fluid bg-primary vh-100 vm-100">
      <h1>Store {storeId}</h1>
      <Link to='/' className="">Back</Link>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="storeName">storeName</label>
          <input value={data.storeName || ''} type="text" name="storeName" onChange={(e) => setData({ ...data, storeName: e.target.value })} />
        </div>
        <div className="form-group">
          <label htmlFor="storeType">storeType</label>
          <input value={data.storeType || ''} type="text" name="storeType" onChange={(e) => setData({ ...data, storeType: e.target.value })} />
        </div>
        <div className="form-group">
          <label htmlFor="storeDes">storeDes</label>
          <input value={data.storeDes || ''} type="text" name="storeDes" onChange={(e) => setData({ ...data, storeDes: e.target.value })} />
        </div>
        <div className="form-group">
          <label htmlFor="email">email</label>
          <input value={data.email || ''} type="text" name="email" onChange={(e) => setData({ ...data, email: e.target.value })} />
        </div>
        <div className="form-group">
          <label htmlFor="pass">pass</label>
          <input value={data.pass || ''} type="text" name="pass" onChange={(e) => setData({ ...data, pass: e.target.value })} />
        </div>
        <div className="form-group">
          <label htmlFor="phone">phone</label>
          <input value={data.phone || ''} type="text" name="phone" onChange={(e) => setData({ ...data, phone: e.target.value })} />
        </div>
        <div className="form-group">
          <label htmlFor="address">address</label>
          <textarea value={data.address || ''} name="address" onChange={(e) => setData({ ...data, address: e.target.value })}></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Edit;