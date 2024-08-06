import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import '../css/ComponentStore.css';

function ComponentStore({ user_id }) {
  const [compostores, setCompostores] = useState([]);
  const [selectedCompostore, setSelectedCompostore] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [storeId, setStoreId] = useState('');
  const [formValues, setFormValues] = useState({
    compostore_name: '',
    compo_status_id: '1', // Default value
    storeId: storeId // Initially empty, will be set on fetch
  });
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [deleteCompostoreId, setDeleteCompostoreId] = useState(null);

  // Fetch stores when component mounts
  const fetchStores = useCallback(async () => {
    try {
      const response = await axios.get(`/get_stores_check/${user_id}`);
      if (response.data.length > 0) {
        const fetchedStoreId = response.data[0].storeId;
        setStoreId(fetchedStoreId);
        setFormValues((prevValues) => ({
          ...prevValues,
          storeId: fetchedStoreId
        }));
      }
    } catch (error) {
      console.error('Error fetching stores:', error);
    }
  }, [user_id]);

  useEffect(() => {
    fetchStores();
  }, [fetchStores]);

  // Fetch compostores when storeId changes
  const fetchCompostores = useCallback(async () => {
    if (!storeId) return;
    try {
      const response = await axios.get(`/compostores/${storeId}`);
      setCompostores(response.data);
    } catch (error) {
      console.error('Error fetching compostores:', error);
    }
  }, [storeId]);

  useEffect(() => {
    fetchCompostores();
  }, [storeId, fetchCompostores]);

  const handleAddCompostore = () => {
    setSelectedCompostore(null);
    setFormValues({
      compostore_name: '',
      compo_status_id: '1',
      storeId: storeId
    });
    setIsModalOpen(true);
  };

  const handleEditCompostore = (compostore) => {
    setSelectedCompostore(compostore);
    setFormValues({
      compostore_name: compostore.compostore_name,
      compo_status_id: compostore.compo_status_id,
      storeId: compostore.storeId
    });
    setIsModalOpen(true);
  };

  const handleDeleteCompostore = (compostore_id) => {
    setDeleteCompostoreId(compostore_id);
    setIsConfirmModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedCompostore) {
        // Edit existing compostore
        await axios.put(`/edit_compostore/${selectedCompostore.compostore_id}`, formValues);
      } else {
        // Add new compostore
        await axios.post('/compostore_register', formValues);
      }
      fetchCompostores();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving compostore:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }));
  };

  return (
    <div>
      <h1>Compostores</h1>
      <button onClick={handleAddCompostore}>Add Compostore</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Status ID</th>
            <th>Store ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {compostores.map((compo) => (
            <tr key={compo.compostore_id}>
              <td>{compo.compostore_id}</td>
              <td>{compo.compostore_name}</td>
              <td>{compo.compo_status_id}</td>
              <td>{compo.storeId}</td>
              <td>
                <button onClick={() => handleEditCompostore(compo)}>Edit</button>
                <button onClick={() => handleDeleteCompostore(compo.compostore_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>{selectedCompostore ? 'Edit Compostore' : 'Add Compostore'}</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Name</label>
                <input
                  type="text"
                  name="compostore_name"
                  value={formValues.compostore_name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Status ID</label>
                <select
                  name="compo_status_id"
                  value={formValues.compo_status_id}
                  onChange={handleChange}
                  required
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                </select>
              </div>
              <button type="submit">Save</button>
              <button type="button" onClick={() => setIsModalOpen(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}

      {isConfirmModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Confirm Deletion</h2>
            <p>Are you sure you want to delete this compostore?</p>
            <button onClick={async () => {
              if (deleteCompostoreId) {
                try {
                  await axios.delete(`/delete_compostore/${deleteCompostoreId}`);
                  fetchCompostores();
                } catch (error) {
                  console.error('Error deleting compostore:', error);
                }
              }
              setIsConfirmModalOpen(false);
            }}>Confirm</button>
            <button onClick={() => setIsConfirmModalOpen(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ComponentStore;
