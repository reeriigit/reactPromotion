import React from 'react';
import Showproduct from '../component/Showproduct';



function Showforyou({user_id}) {
  //เพราะถ้าไม่ทำมันเป็น {{user_id}} จะเข้าถึง user_id.user_id
  console.log("show for you === ",user_id)
  return (
    <div className="Showforyou">
        <div className="title ">
            <p>โปรสำหรับคุณ</p>
        </div>
        <div className="menuchoose ">
            <div className="item">ทังหมด</div>
            <div className="item">ร้านคาเฟ</div>
            <div className="item">ร้านคาเฟ</div>
            <div className="item">ร้านคาเฟ</div>
            <div className="item">ร้านคาเฟ</div>

        </div>
        <Showproduct user_id={user_id} />
      
    </div>
  );
}

export default Showforyou;
