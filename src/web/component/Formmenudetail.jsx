import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/Formmenudetail.css'; // Make sure to create and import this CSS file

function Formmenudetail({ product_type_id, menudetail, setMenudetail, orderdetail, setOrderDetail }) {
  const [options, setOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await axios.get(`/menu_detail/${product_type_id}`);
        const menuDetails = response.data;
        const optionList = menuDetails.map(item => item.menu_detail_name);
        setOptions(optionList);
        setSelectedOptions(menudetail || []);
        setInputText(orderdetail || '');
      } catch (error) {
        console.error('Error fetching menu details:', error);
      }
    };

    fetchOptions();
  }, [product_type_id, menudetail, orderdetail]);

  const handleCheckboxChange = (option) => {
    let updatedOptions = [...selectedOptions];
    if (updatedOptions.includes(option)) {
      updatedOptions = updatedOptions.filter(item => item !== option);
    } else {
      updatedOptions.push(option);
    }
    setSelectedOptions(updatedOptions);
    setMenudetail(updatedOptions);
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputText(value);
    setOrderDetail(value);
  };

  return (
    <div className="form-menu-detail">
      <h4 className="form-title">กำหนดเมนู</h4>
      <div className="checkbox-group">
        {options.map(option => (
          <div className="checkbox-item" key={option}>
            <input 
              type="checkbox" 
              id={option} 
              name={option} 
              value={option} 
              checked={selectedOptions.includes(option)}
              onChange={() => handleCheckboxChange(option)}
              className="checkbox-input"
            />
            <label htmlFor={option} className="checkbox-label">{option}</label>
          </div>
        ))}
      </div>
      <h4 className="additional-info-title">ระบุเพิ่มเติม</h4>
      <textarea 
        value={inputText}
        onChange={handleInputChange}
        placeholder="กรุณาใส่รายละเอียดเพิ่มเติม"
        className="additional-info-textarea"
      />
    </div>
  );
}

export default Formmenudetail;
