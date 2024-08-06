import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/Showproduct.css';
import DetailSetpro from './DetailSetpro';

function Showproduct({user_id}) {

  console.log("show product ",user_id)
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/setpromotionslist', {
          params: {
            storeId: 'someStoreId' // แทนที่ด้วย storeId ที่คุณต้องการ
          }
        });
        setProducts(response.data);
        console.log("list pro all",response.data)
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleCardClick = (product) => {
    setSelectedProduct(product);
  };

  const handleClosePopup = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="showproduct-container">
      {products.map((product, index) => {
        let images = [];
        try {
          images = JSON.parse(product.images);
        } catch (e) {
          console.error('Error parsing images:', e);
        }

        return (
          <div className="product-card" key={index} onClick={() => handleCardClick(product)}>
            {images.length > 0 && (
              <img src={`/productimages/${images[0]}`} alt={product.name} />
            )}
            <h3>{product.name}</h3>
            <p>Price: {product.price} บาท</p>
            <p>Promo: {product.promo_name}</p>
          </div>
        );
      })}

      {selectedProduct && (
        <DetailSetpro user_id={user_id} selectedProduct={selectedProduct} handleClosePopup={handleClosePopup} />
      )}
    </div>
  );
}

export default Showproduct;
