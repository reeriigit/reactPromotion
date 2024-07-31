import React from 'react';
import './css/Popuser.css'

function Popuser(user_id) {
  console.log("popuser",user_id)

  return (
    <div className="Popuser">
        <button>{user_id.user_id}</button>
        <button>1</button>
        <button>1</button>
        
      
    </div>
  );
}

export default Popuser;
