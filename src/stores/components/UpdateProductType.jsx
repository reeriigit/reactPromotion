import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';

const UpdateProductType = ({ storeId, onUpdateSuccess, product_type_id }) => {
  const [data, setData] = useState({
    storeId: storeId,
    product_type_image: null,
    product_type_name: '',
    description: '',
  });

  const [productTypeImageFile, setProductTypeImageFile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
    console.log("roool fuck ",`${product_type_id}`)
        const response = await axios.get(`/get_producttype/${product_type_id}`);
        setData(response.data[0]);
        console.log("Existing product type data:", response.data[0]);
      } catch (error) {
        console.error('Error fetching product type:', error);
      }
    };

    fetchData();
  }, [product_type_id]);

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append('product_type_image', productTypeImageFile);

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    console.log("Data to be sent:", formData);

    axios.put(`/updateProductType/${product_type_id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((res) => {
        console.log(res);
        if (onUpdateSuccess) {
          onUpdateSuccess();
        }
      })
      .catch((err) => {
        console.log("Error:", err);
        alert('Error updating product type. Please check the console for more details.');
      });
  }

  // Add conditional rendering
  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="product_type_image">
        <Form.Label>Product Type Image: {data.product_type_image}</Form.Label>
        <Form.Control
          type="file"
          name="product_type_image"
          onChange={(e) => {
            setProductTypeImageFile(e.target.files[0]);
          }}
        />

        {productTypeImageFile ? (
          <img
            src={URL.createObjectURL(productTypeImageFile)}
            alt="Preview"
            style={{ maxWidth: '100px', maxHeight: '100px', marginTop: '10px' }}
          />
        ) : (
          <img
            src={`/producttypeimages/${data.product_type_image}`}
            alt="Preview"
            style={{ maxWidth: '100px', maxHeight: '100px', marginTop: '10px' }}
          />
        )}
      </Form.Group>

      <Form.Group controlId="product_type_name">
        <Form.Label>Product Type Name:</Form.Label>
        <Form.Control
          value={data.product_type_name || ''}
          type="text"
          name="product_type_name"
          onChange={(e) => setData({ ...data, product_type_name: e.target.value })}
        />
      </Form.Group>

      <Form.Group controlId="description">
        <Form.Label>Description:</Form.Label>
        <Form.Control
          value={data.description || ''}
          type="text"
          name="description"
          onChange={(e) => setData({ ...data, description: e.target.value })}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default UpdateProductType;
