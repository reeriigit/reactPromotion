import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

function EditStoredata() {
  const [data, setData] = useState({
    logo: null,
    storeName: '',
    storeType: '',
    storeDes: '',
    email: '',
    pass: '',
    phone: '',
    address: ''
  });
  const { storeId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/get_stores/${storeId}`)
      .then((res) => {
        setData(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, [storeId]);

  function handleFileChange(e) {
    const selectedFile = e.target.files[0];
    setData({ ...data, logo: selectedFile });
  }

  function renderLogoImage() {
    return data.logo && (
      <img
        src={data.logo instanceof File ? URL.createObjectURL(data.logo) : `images/${data.logo}`}
        alt="Store Logo"
        style={{ maxWidth: '200px', marginTop: '10px' }}
      />
    );
  }

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    if (data.logo) {
      formData.append('logo', data.logo);
    }

    Object.entries(data).forEach(([key, value]) => {
      if (key !== 'logo') {
        formData.append(key, value);
      }
    });

    axios.put(`/edit_stores/${storeId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((res) => {
       
        navigate(`/admin/storedata`);
        console.log(res);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="container-fluid bg-primary vh-100 vm-100">
      <h1>Store {storeId}</h1>
      <Link to='/'>Back</Link>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="logo">logo</label>
          <input type="file" name="logo" onChange={handleFileChange} />
          {renderLogoImage()}
        </div>
        <div className="form-group">
          <label htmlFor="storeName">storeName</label>
          <input value={data.storeName || ''} type="text" name="storeName" onChange={(e) => setData({ ...data, storeName: e.target.value })} />
        </div>
        <div className="form-group">
          <label htmlFor="storeType">Store Type</label>
          <select value={data.storeType} onChange={(e) => setData({ ...data, storeType: e.target.value })}>
            <option value="">Choose Store Type</option>
            <option value="1">ร้านบริการ</option>
            <option value="2">ร้านอาหาร</option>
          </select>
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
        <div className="form-group">
          <label htmlFor="storeType">Status</label>
          <select value={data.status} onChange={(e) => setData({ ...data, status: e.target.value })}>
            <option value="">Choose Store Type</option>
            <option value="1">รอการอนุมัติ</option>
            <option value="2">อนุมัติเเล้ว</option>
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default EditStoredata;
