import React from 'react';
import Advertising from './Advertising';
import Category from './Category';
import Showforyou from './Showforyou';


function Mybody(user_id) {
  console.log("my body = ",user_id)
  
  return (
    <div className="mybody">
        <Advertising/>
        <Category/>
        <Showforyou user_id={user_id}/>
      
    </div>
  );
}

export default Mybody;
