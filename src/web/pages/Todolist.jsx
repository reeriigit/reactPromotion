import React, { useState  } from 'react';
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


  console.log("todolist user", user_id);
  console.log("shoooe  ww ", set_promotion_id);
  const [activeComponent, setActiveComponent] = useState('Order');
  const [currentSetPromotionId, setCurrentSetPromotionId] = useState(set_promotion_id);
  const [puoderStatusId, setPuoderStatusId] = useState(null);

  if (!currentSetPromotionId && !storeId) {
    return <div>No product selected.</div>;
  }

  const handleButtonClick = (component, statusId = null) => {
    setActiveComponent(component);
    setPuoderStatusId(statusId);
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
            user_id={user_id}
            set_promotion_id={currentSetPromotionId}
            storeId={storeId}
            saveOder={saveOder}
          />
        );
      case 'Ordereditems':
        return <Ordereditems puoderStatusId={puoderStatusId} user_id={user_id} />;
      case 'Completion':
        return <Completion />;
      default:
        return null;
    }
  };

  return (
    <div className='Todolist'>
      <Popuser user_id={user_id} />
      <div className="menuselect">
        <button
          onClick={() => handleButtonClick('Order')}
          className={activeComponent === 'Order' ? 'active' : ''}
        >
          คำสั่งซื้อ
        </button>
        <button
          onClick={() => handleButtonClick('Ordereditems', 1)}
          className={activeComponent === 'Ordereditems' && puoderStatusId === 1 ? 'active' : ''}
        >
          รายการที่สั่ง (รอการชำระ)
        </button>
        <button
          onClick={() => handleButtonClick('Ordereditems', 3)}
          className={activeComponent === 'Ordereditems' && puoderStatusId === 3 ? 'active' : ''}
        >
          รายการที่สั่ง (เสร็จสิ้น)
        </button>
        <button
          onClick={() => handleButtonClick('Ordereditems', 2)}
          className={activeComponent === 'Ordereditems' && puoderStatusId === 2 ? 'active' : ''}
        >
          ยกเลิก (เสร็จสิ้น)
        </button>
     
      </div>
      <div className="container">
        {renderComponent()}
      </div>
    </div>
  );
}

export default Todolist;
