import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const navigate = useNavigate();  // Initialize useNavigate

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    full_name: '',
    address: '',
    phone_number: '',
    user_type: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Call your API to insert the data into the database
    axios.post('/users_register', formData)
      .then((response) => {
        console.log('User created successfully:', response.data);
        // Handle success, e.g., redirect or show a success message
        navigate(`/web/login`);
      })
      .catch((error) => {
        console.error('Error creating user:', error.response.data);
        // Handle error, e.g., display an error message
      });
  };

  return (
    <div>
      <h3>Register</h3>
      <form onSubmit={handleSubmit}>
        {/* Add input fields for each form field */}
        <div>
          <label>Username:</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </div>
        <div>
          <label>Full Name:</label>
          <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} />
        </div>
        <div>
          <label>Address:</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} />
        </div>
        <div>
          <label>Phone Number:</label>
          <input type="text" name="phone_number" value={formData.phone_number} onChange={handleChange} />
        </div>
        <div>
          <label>User Type:</label>
          <select name="user_type" value={formData.user_type} onChange={handleChange}>
            <option value="1">Admin</option>
            <option value="2">Buyer</option>
            <option value="3">Store</option>
          </select>
        </div>
        <div>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
