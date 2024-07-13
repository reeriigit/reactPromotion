import React, { useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';


import '../css/SidebarData.css';
import {
  FaTh,
  FaBars,
  FaUserAlt,
  FaRegChartBar,
  FaCommentAlt,
  FaShoppingBag,
  FaThList,
  FaCogs
} from 'react-icons/fa';

// ... (your other imports)

const SidebarData = ({ children }) => {
    const { user_id } = useParams();
  
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
  
    const menuItem = [
      {
        path: `/stores/dashboard/${user_id}`,
        name: 'Dashboard',
        icon: <FaTh />,
      },
      
      {
        path: `/stores/store/${user_id}`,
        name: 'About',
        icon: <FaUserAlt />,
      },
      {
        path: `/stores/setpromotion/${user_id}`,
        name: 'SetPromotion',
        icon: <FaRegChartBar />,
      },
      {
        path: `/stores/product/${user_id}`,
        name: 'Product',
        icon: <FaCommentAlt />,
      },
      {
        path: `/stores/producttype/${user_id}`,
        name: 'ProductType',
        icon: <FaShoppingBag />,
      },
      {
        path: `/stores/promotions/${user_id}`,
        name: 'Product List',
        icon: <FaThList />,
      },
      {
        path: `/stores/setting/profile/${user_id}`, // Assuming you have a settings page
        name: 'Settings',
        icon: <FaCogs />, // Use the FaCogs icon for settings
      },
      
    ];
  
    return (
      <div className="containersidebar">
        <div style={{ width: isOpen ? '200px' : '50px' }} className="sidebar">
          <div className="top_section">
            <h1 style={{ display: isOpen ? 'block' : 'none' }} className="logo">
              Logo
            </h1>
            <div style={{ marginLeft: isOpen ? '50px' : '0px' }} className="bars">
              <FaBars onClick={toggle} />
            </div>
          </div>
          {menuItem.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              className="link"
              activeClassName="active" // Fix typo here
            >
              <div className="icon">{item.icon}</div>
              <div style={{ display: isOpen ? 'block' : 'none' }} className="link_text">
                {item.name}
              </div>
            </NavLink>
          ))}
        </div>
        <main>{children}</main>
      </div>
    );
  };
  
  export default SidebarData;
  