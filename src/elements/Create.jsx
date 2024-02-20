import React, { useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

function Create() {
  const [values, setValues] = useState({
    storeName: '',
    storeType: '',
    storeDes: '',
    email: '',
    pass: '',
    phone: '',
    address: ''
  });
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    axios.post('/add_store', values)
      .then((res) => {
        navigate('/');
        console.log(res);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="container vh-100 vw-100 bg-primary">
      <div className="row">
        <h3>Add Student</h3>
        <div className="d-flex justify-content-end">
            <Link to='/'>Home</Link>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="storeName">storeName</label>
            <input type="text" name="storeName" onChange={(e) => setValues({ ...values, storeName: e.target.value })} />
          </div>
          <div className="form-group">
            <label htmlFor="storetype">storetype</label>
            <input type="text" name="storetype" onChange={(e) => setValues({ ...values, storeType: e.target.value })} />
          </div>
          <div className="form-group">
            <label htmlFor="storeDes">storeDes</label>
            <input type="text" name="storeDes" onChange={(e) => setValues({ ...values, storeDes: e.target.value })} />
          </div>
          <div className="form-group">
            <label htmlFor="email">email</label>
            <input type="text" name="email" onChange={(e) => setValues({ ...values, email: e.target.value })} />
          </div>
          <div className="form-group">
            <label htmlFor="pass">pass</label>
            <input type="text" name="pass" onChange={(e) => setValues({ ...values, pass: e.target.value })} />
          </div>
          <div className="form-group">
            <label htmlFor="phone">phone</label>
            <input type="text" name="phone" onChange={(e) => setValues({ ...values, phone: e.target.value })} />
          </div>
          <div className="form-group">
            <label htmlFor="address">address</label>
            <input type="textarea" name="address" onChange={(e) => setValues({ ...values, address: e.target.value })} />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Create;
