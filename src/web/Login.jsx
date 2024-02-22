// Login.jsx
import React from "react";
import { Link } from "react-router-dom";
import LoginStore from "./LoginStore";
import LoginUser from "./LoginUser";
import './css/Login.css';

const Login = () => {
  

  return (
    <div className="">
      <div className="rows">
        <LoginStore/>
        <LoginUser/>
      </div>
      <Link to='/' className="">Back</Link>
    </div>
  );
};

export default Login;
