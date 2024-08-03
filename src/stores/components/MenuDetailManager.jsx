import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/MenuDetailManager.css'
import 'bootstrap/dist/css/bootstrap.min.css';


function MenuDetailManager({ productTypeId }) {
  const [menuDetails, setMenuDetails] = useState([]);
  const [menuDetailId, setMenuDetailId] = useState(null);
  const [menuDetailName, setMenuDetailName] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchMenuDetails(productTypeId);
  }, [productTypeId]);

  const fetchMenuDetails = (productTypeId) => {
    axios.get(`/menu_detail/${productTypeId}`)
      .then(response => {
        setMenuDetails(response.data);
      })
      .catch(error => {
        console.error('Error fetching menu details:', error);
      });
  };

  const handleSave = () => {
    const payload = {
      product_type_id: productTypeId,
      menu_detail_name: menuDetailName,
    };

    if (isEditing) {
      axios.put(`/updateMenuDetail/${menuDetailId}`, payload)
        .then(response => {
          alert('Menu detail updated successfully');
          fetchMenuDetails(productTypeId);
          resetForm();
        })
        .catch(error => {
          console.error('Error updating menu detail:', error);
          alert('Failed to update menu detail');
        });
    } else {
      axios.post('/insertMenuDetail', payload)
        .then(response => {
          alert('Menu detail inserted successfully');
          fetchMenuDetails(productTypeId);
          resetForm();
        })
        .catch(error => {
          console.error('Error inserting menu detail:', error);
          alert('Failed to insert menu detail');
        });
    }
  };

  const handleEdit = (menuDetail) => {
    setMenuDetailId(menuDetail.menu_detail_id);
    setMenuDetailName(menuDetail.menu_detail_name);
    setIsEditing(true);
  };

  const handleDelete = (menuDetailId) => {
    axios.delete(`/deleteMenuDetail/${menuDetailId}`)
      .then(response => {
        alert('Menu detail deleted successfully');
        fetchMenuDetails(productTypeId);
      })
      .catch(error => {
        console.error('Error deleting menu detail:', error);
        alert('Failed to delete menu detail');
      });
  };

  const resetForm = () => {
    setMenuDetailId(null);
    setMenuDetailName('');
    setIsEditing(false);
  };

  return (
    <div className="MenuDetailManager">
      <h2>{isEditing ? 'Edit' : 'Create'} Menu Detail</h2>
      <div>
        <label>Menu Detail Name</label>
        <input
          type="text"
          value={menuDetailName}
          onChange={(e) => setMenuDetailName(e.target.value)}
        />
      </div>
      <button onClick={handleSave}>{isEditing ? 'Update' : 'Save'}</button>
      <ul>
        {menuDetails.map(detail => (
          <li key={detail.menu_detail_id}>
            {detail.menu_detail_name}
            <button onClick={() => handleEdit(detail)}>Edit</button>
            <button onClick={() => handleDelete(detail.menu_detail_id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MenuDetailManager;
