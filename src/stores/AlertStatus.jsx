import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import './css/AlertStatus.css'
function AlertStatus() {
  const { user_id } = useParams();
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/get_stores_check/${user_id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.error(err));
  }, [user_id]);

  useEffect(() => {
    if (data.length > 0 && data[0].status === 2) {
      navigate(`/stores/dashboard/${user_id}`);
    }
  }, [data, navigate, user_id]);

  return (
    <div className="containerprofile">
      {data.length === 0 && <p className="load">Loading...</p>}
      {data.length > 0 && data[0].status === 1 && (
        <p>รอการอนุมัติ</p>
        
      )}
     
    </div>
  );
}

export default AlertStatus;
