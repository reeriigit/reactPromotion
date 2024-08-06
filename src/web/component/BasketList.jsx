import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/BasketList.css';

function BasketList({ user_id }) {
  const [baskets, setBaskets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`/baskets/${user_id}`)
      .then(response => {
        setBaskets(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('There was an error fetching the baskets!', error);
        setError(error);
        setLoading(false);
      });
  }, [user_id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>There was an error loading the baskets.</p>;

  // Group baskets by store
  const groupedBaskets = baskets.reduce((acc, basket) => {
    if (!acc[basket.storeId]) {
      acc[basket.storeId] = {
        storeName: basket.storeName,
        items: []
      };
    }
    acc[basket.storeId].items.push(basket);
    return acc;
  }, {});

  return (
    <div className="BasketList">
      {Object.keys(groupedBaskets).length === 0 ? (
        <p>No baskets found for this user.</p>
      ) : (
        Object.keys(groupedBaskets).map((storeId) => (
          <div key={storeId} className="store-section">
            <h5 style={{marginLeft:'10px'}}>{groupedBaskets[storeId].storeName}</h5>
            {groupedBaskets[storeId].items.map((basket) => {
              let images = [];
              try {
                images = JSON.parse(basket.images);
              } catch (e) {
                console.error('Error parsing images:', e);
              }

              return (
                <div key={basket.set_promotion_id} className="basket-item">
                    {images.length > 0 && (
                    <img width={100} height={100} src={`/productimages/${images[0]}`} alt={basket.name} />
                  )}
                  <div className="">
                    <p>{basket.name}</p>
                    <p  style={{color: 'orange'}}>{basket.promo_name}</p>
                    <p style={{color: 'red'}} >฿{basket.price}</p>
                  </div>
                  
                </div>
              );
            })}
          </div>
        ))
      )}
    </div>
  );
}

export default BasketList;
