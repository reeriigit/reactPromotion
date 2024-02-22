// Login.jsx
import React from "react";
import { Link } from "react-router-dom";
import './css/LoginStore.css'; // Import your CSS file for styling

const LoginUser = () => {
  return (
        <div className="minicontainer">
          <h3>LoginUser</h3>
          <form>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                // value={credentials.username}
                // onChange={handleChange}
                className="form-control" // Add form-control class for styling
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                // value={credentials.password}
                // onChange={handleChange}
                className="form-control" // Add form-control class for styling
              />
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
            <Link to='/stores/create' className="btn btn-secondary">Create User</Link>
          </form>
        </div>
  );
};

export default LoginUser;
