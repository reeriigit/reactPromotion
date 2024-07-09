
import React from "react";
import DashboardCom from "../components/DashboardCom";
import '../css/DashboardCom.css';
import { useParams } from 'react-router-dom';
function Dashboard() {
  const { user_id } = useParams();

 

  return (
    <div className="dashboardcon">
    <DashboardCom user_id={user_id} />
    </div>
  );
}

export default Dashboard;
