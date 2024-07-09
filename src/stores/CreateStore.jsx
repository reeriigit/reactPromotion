import React, { useState, useEffect } from "react";
import axios from 'axios';
import {  useNavigate, useParams } from "react-router-dom";

function CreateStore() {
  const { username, password } = useParams();
  const [data, setData] = useState([]);
  const [values, setValues] = useState({
    user_id: '',
    logo: '',
    storeName: '',
    storeType: 1,
    storeDes: '',
    style: '',
    province: '',
    phone: '',
    address: ''
  });
  const [previewLogo, setPreviewLogo] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/users_check/${username}/${password}`)
      .then((res) => {
        setData(res.data);
        if (res.data.length > 0) {
          setValues((prevValues) => ({ ...prevValues, user_id: res.data[0].user_id }));
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [username, password]);

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('user_id', values.user_id);
    formData.append('logo', values.logo);
    formData.append('storeName', values.storeName);
    formData.append('storeType', values.storeType);
    formData.append('storeDes', values.storeDes);
    formData.append('style', values.style);
    formData.append('province', values.province);
    formData.append('phone', values.phone);
    formData.append('address', values.address);

    axios.post('/add_store', formData)
      .then((res) => {
        const { user_id } = data[0];
        navigate(`/stores/mulimages/${user_id}`);
      })
      .catch((err) => console.error(err));
  }

  function handleLogoChange(e) {
    const file = e.target.files[0];
    setValues({ ...values, logo: file });
    setPreviewLogo(URL.createObjectURL(file));
  }

  return (
    <div className="container mt-5">
      <div className="row">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <React.Fragment>
            <div className="col-md-6 offset-md-3">
              <h3 className="mb-4">Create Store</h3>
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                {/* ... */}
                <div className="form-group">
                  <label htmlFor="user_id">User ID</label>
                  <input type="text" className="form-control" value={values.user_id} name="user_id" onChange={(e) => setValues({ ...values, user_id: e.target.value })} />
                </div>
                {/* ... */}
                <div className="form-group">
                  <label htmlFor="logo">โล้โก้</label>
                  <input type="file" className="form-control-file" name="logo" onChange={handleLogoChange} />
                  {previewLogo && <img src={previewLogo} alt="Preview" className="img-thumbnail mt-2" />}
                </div>
                {/* ... */}
                <div className="form-group">
                  <label htmlFor="storeName">ชื่อร้านค้า</label>
                  <input type="text" className="form-control" name="storeName" onChange={(e) => setValues({ ...values, storeName: e.target.value })} />
                </div>
                {/* ... */}
                <div className="form-group">
                  <label htmlFor="storeType">ประเภทร้านค้า</label>
                  <select className="form-control" value={values.storeType} onChange={(e) => setValues({ ...values, storeType: e.target.value })}>
                    <option value="1">ร้านบริการ</option>
                    <option value="2">ร้านอาหาร</option>
                    <option value="3">ร้านคาเฟ่</option>
                    
                  </select>
                </div>
                {/* ... */}
                <div className="form-group">
                  <label htmlFor="storeDes">คำอธิบายร้านค้า</label>
                  <input type="text" className="form-control" name="storeDes" onChange={(e) => setValues({ ...values, storeDes: e.target.value })} />
                </div>
                {/* ... */}
                <div className="form-group">
                  <label htmlFor="style">สไตล์ของร้านค้า</label>
                  <input type="text" className="form-control" name="style" onChange={(e) => setValues({ ...values, style: e.target.value })} />
                </div>
                {/* ... */}
                <div className="form-group">
                  <label htmlFor="province">จังหวัด</label>
                  <input type="text" className="form-control" name="province" onChange={(e) => setValues({ ...values, province: e.target.value })} />
                </div>
                {/* ... */}
                <div className="form-group">
                  <label htmlFor="phone">เบอร์โทรศัพท์</label>
                  <input type="text" className="form-control" name="phone" onChange={(e) => setValues({ ...values, phone: e.target.value })} />
                </div>
                {/* ... */}
                <div className="form-group">
                  <label htmlFor="address">ที่อยู่</label>
                  <textarea className="form-control" name="address" onChange={(e) => setValues({ ...values, address: e.target.value })}></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}

export default CreateStore;
