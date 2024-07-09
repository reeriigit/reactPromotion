import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import "./css/Login.css"
import imagelogin from "./css/imagelogin.jpg";
import logopati from "./css/logopati2.png";

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
          const user_id = users[0].user_id;
  
          if (user_type===1) {
            navigate(`/admin/${user_id}`);
          }
          if (user_type===2) {
            navigate(`/web/${user_id}`);
          }
          if (user_type===3) {
            navigate(`/stores/alertstatus/${user_id}`);
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
     <div className="bodylogin">
      <div className="bodybu"></div>
      <div className="minicontainer">
      <div className="blockimg">
        <div className="titletaty">
          <p>Select Your Promotion</p>
          <p>Adop the peach</p>
        </div>
        <Link to='/web/register' className="btnregis">Sign Up</Link>
        <div className="textsignup">Don't have an account ?</div>
        <img src={imagelogin} alt="Description" />
        <div className="blockwhite"></div>
      </div>
      <div className="blockform">
      <form onSubmit={handleSubmit}>
        <div className="blockpro">
        <img src={logopati} alt="Description" />
          
        <h3><b>WELL COME <span>P</span>A<span>T</span>I !</b></h3>
        </div>
        <div className="">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <button type="submit" className="loginbutton">Login</button>
        <Link to='/stores/regisstore' className="btnstore">Want to be Store</Link>
      </form>
      </div>
    </div>
     </div>
  );
};

export default Login;
