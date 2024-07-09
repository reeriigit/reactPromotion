import React, { useState, useEffect } from 'react';
import ImageUploadForm from '../ImageUploadForm';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import { Gallery } from 'react-grid-gallery';

function UploadImageForm(store) {
  const [data, setStore] = useState(null);

  useEffect(() => {
    axios
      .get(`/get_mulimagestb/${store.storeId}`)
      .then((res) => {
        setStore(res.data[0]);
        console.log("fuckoff ", res.data);
      })
      .catch((err) => console.log(err));
  }, [store.storeId]);

  return (
    <>
      <Container>
        <h1>{store.storeId}</h1>
        {data &&
          data.mulimages && (
            <Gallery
              images={data.mulimages.split(',').map((imageName, index) => ({
                src: `/mulimages/${imageName}`,
                thumbnail: `/mulimages/${imageName}`,
                thumbnailWidth: 171,
                thumbnailHeight: 180,
              }))}
            />
          )}
        <ImageUploadForm key={store.storeId} paramId={store.storeId} />
      </Container>
    </>
  );
}

export default UploadImageForm;
