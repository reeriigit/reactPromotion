import React, { useState } from 'react';
import './css/Popuser.css';
import BasketList from './BasketList';
import ProfileUser from './ProfileUser';

const Popuser = ({ user_id }) => {
  // Local state to control which component to show
  const [activeComponent, setActiveComponent] = useState('none');
  
  // Function to toggle state (optional, add if needed)
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className={`popuser ${isOpen ? 'closed' : 'open'}`}>
      <div className="popuser-content">
        <button onClick={toggle}>| | |</button>
        <div className="">
        <button onClick={() => setActiveComponent('basket')}>ตะกร้า</button>
        <button onClick={() => setActiveComponent('profile')}>2</button>
        </div>
      </div>
      <div className="showbaske">
        {activeComponent === 'basket' && <BasketList user_id={user_id} />}
        {activeComponent === 'profile' && <ProfileUser user_id={user_id} />}
      </div>
    </div>
  );
};

export default Popuser;
