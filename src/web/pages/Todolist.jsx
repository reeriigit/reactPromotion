import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../css/Todolist.css';
import Order from '../component/Order';
import Popuser from '../component/Popuser';
import Ordereditems from '../component/Ordereditems';

// Dummy components for demonstration purposes



const Completion = () => (
  <div>
    <h2>Order Completed</h2>
    <p>Your order has been successfully placed!</p>
  </div>
);

function Todolist() {
  const location = useLocation();
  const { set_promotion_id, storeId, user_id } = location.state || {};
  console.log("shoooe  ww ", set_promotion_id);
  const [activeComponent, setActiveComponent] = useState('Order');
  const [currentSetPromotionId, setCurrentSetPromotionId] = useState(set_promotion_id);

  if (!currentSetPromotionId && !storeId) {
    return <div>No product selected.</div>;
  }

  const handleButtonClick = (component) => {
    setActiveComponent(component);
  };

  const saveOder = () => {
    setCurrentSetPromotionId(null);
    setActiveComponent('Ordereditems');
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case 'Order':
        return (
          <Order
            user_id={user_id.user_id}
            set_promotion_id={currentSetPromotionId}
            storeId={storeId}
            saveOder={saveOder}
          />
        );
      case 'Ordereditems':
        return <Ordereditems user_id={user_id.user_id} />;
      case 'Completion':
        return <Completion />;
      default:
        return null;
    }
  };

  return (
    <div className='Todolist'>
      <Popuser user_id={user_id.user_id} />
      <div className="title">Make Order</div>
      <div className="menuselect">
        <button
          onClick={() => handleButtonClick('Order')}
          className={activeComponent === 'Order' ? 'active' : ''}
        >
          คำสั่งซื้อ
        </button>
        <button
          onClick={() => handleButtonClick('Ordereditems')}
          className={activeComponent === 'Ordereditems' ? 'active' : ''}
        >
          รายการที่สั่ง
        </button>
        <button
          onClick={() => handleButtonClick('Completion')}
          className={activeComponent === 'Completion' ? 'active' : ''}
        >
          เสร็จสิ้น
        </button>
      </div>
      <div className="container">
        {renderComponent()}
      </div>
    </div>
  );
}

export default Todolist;
