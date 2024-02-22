import React, { useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

function CreateStore() {
  const [values, setValues] = useState({
    logo: '',
    storeName: '',
    storeType: '',
    storeDes: '',
    email: '',
    pass: '',
    phone: '',
    address: ''
  });
  const [previewLogo, setPreviewLogo] = useState('');
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append('logo', values.logo);
    formData.append('storeName', values.storeName);
    formData.append('storeType', values.storeType);
    formData.append('storeDes', values.storeDes);
    formData.append('email', values.email);
    formData.append('pass', values.pass);
    formData.append('phone', values.phone);
    formData.append('address', values.address);

    axios.post('/add_store', formData)
      .then((res) => {
        const { email, pass } = values;
        navigate(`/stores/mulimages/${email}/${pass}`);
        console.log(res);
      })
      .catch((err) => console.log(err));
  }

  function handleLogoChange(e) {
    const file = e.target.files[0];
    setValues({ ...values, logo: file });
    setPreviewLogo(URL.createObjectURL(file));
  }

  return (
    <div className="container vh-100 vw-100 bg-primary">
      <div className="row">
        <h3>Create Store</h3>
        <div className="d-flex justify-content-end">
          <Link to='/'>Home</Link>
        </div>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="form-group">
            <label htmlFor="logo">Logo</label>
            <input type="file" name="logo" onChange={handleLogoChange} />
            {previewLogo && <img src={previewLogo} alt="Preview" style={{ maxWidth: '100px', maxHeight: '100px' }} />}
          </div>
          <div className="form-group">
            <label htmlFor="storeName">Store Name</label>
            <input type="text" name="storeName" onChange={(e) => setValues({ ...values, storeName: e.target.value })} />
          </div>
          <div className="form-group">
            <label htmlFor="storeType">Store Type</label>
            <select value={values.storeType} onChange={(e) => setValues({ ...values, storeType: e.target.value })}>
              <option value="1">ร้านบริการ</option>
              <option value="2">ร้านอาหาร</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="storeDes">Store Description</label>
            <input type="text" name="storeDes" onChange={(e) => setValues({ ...values, storeDes: e.target.value })} />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="text" name="email" onChange={(e) => setValues({ ...values, email: e.target.value })} />
          </div>
          <div className="form-group">
            <label htmlFor="pass">Password</label>
            <input type="text" name="pass" onChange={(e) => setValues({ ...values, pass: e.target.value })} />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input type="text" name="phone" onChange={(e) => setValues({ ...values, phone: e.target.value })} />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input type="textarea" name="address" onChange={(e) => setValues({ ...values, address: e.target.value })} />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default CreateStore;
