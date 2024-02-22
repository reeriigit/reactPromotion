import React from "react";

import { Link } from "react-router-dom";

function AlertStatus() {
  

  return (
    <div className="container vh-100 vw-100 bg-primary">
      <h1>รอการอนุมัติ</h1>
      <Link to='/'>Home</Link>
    </div>
  );
}

export default AlertStatus;