import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Send a POST request to the login API endpoint
    axios.post('/login', credentials)
      .then((response) => {
        // Assuming the API sends a success message
        console.log("response data", response.data);
  
        const users = response.data;
  
        if (users.length > 0) {
          const user_type = users[0].user_type; // Access user_id from the first user in the array
  
          if (user_type===1) {
            navigate(`/admin/${user_type}`);
          }
          if (user_type===2) {
            navigate(`/web/${user_type}`);
          }
          if (user_type===3) {
            navigate(`/stores/${user_type}`);
          }
  
          console.log('Login successful:', response.data);
          // Redirect to another page or perform other actions
        } else {
          console.error('Login failed: No user data found');
        }
      })
      .catch((error) => {
        console.error('Login failed:', error.response.data);
  
        // You can handle the error here, e.g., display an error message
      });
  };
  

  return (
    <div className="minicontainer">
      <h3>Login User</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
        <Link to='/web/register' className="btn btn-secondary">Create User</Link>
        <Link to='/stores/create' className="btn btn-secondary">Create User</Link>
      </form>
    </div>
  );
};

export default Login;
