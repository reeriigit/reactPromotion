import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const LoginStore = () => {
  const { email, pass } = useParams();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    pass: "",
  });
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`/get_stores_check/${email}/${pass}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.error(err));
  }, [email, pass]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if email and pass match a record in the database
    if (data.length > 0) {
      // Redirect to a different page upon successful login
      console.log("Login success:", data);
      navigate(`/stores/alertstatus/${email}/${pass}`);  // Replace '/dashboard' with the desired route
    } else {
      // Handle login error, e.g., display error message
      setError("Invalid credentials");
    }
  };

  return (
    <div className="minicontainer">
      <h3>LoginStore</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="pass">Password</label>
          <input
            type="password"
            name="pass"
            value={credentials.pass}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit" className="btn btn-primary">
          Login
        </button>
        <Link to='/stores/create' className="btn btn-secondary">
          Create Store
        </Link>
      </form>

      {/* Display information below the form */}
      {data.map((store) => (
        <div key={store.storeId}>
          <p>Email: {store.email}</p>
          <p>Password: {store.pass}</p>
          {/* Add more information as needed */}
        </div>
      ))}
    </div>
  );
};

export default LoginStore;
