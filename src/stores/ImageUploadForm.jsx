import React, { useState } from "react";
import axios from "axios";

function ImageUploadForm() {
  const [storeId, setStoreId] = useState("");
  const [images, setImages] = useState([]);

  const handleStoreIdChange = (e) => {
    setStoreId(e.target.value);
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    setImages(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("storeId", storeId);

    for (const image of images) {
      formData.append("mulimages", image);
    }

    try {
      const response = await axios.post("/add_mulimages", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response.data);
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };

  return (
    <div>
      <h3>Image Upload Form</h3>
      <form encType="multipart/form-data" onSubmit={handleSubmit}>
        <label htmlFor="storeId">Store ID:</label>
        <input
          type="text"
          name="storeId"
          value={storeId}
          onChange={handleStoreIdChange}
        />
        <br />
        <label htmlFor="mulimages">Select Images:</label>
        <input
          type="file"
          name="mulimages"
          multiple
          onChange={handleImageChange}
        />
        <br />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default ImageUploadForm;
