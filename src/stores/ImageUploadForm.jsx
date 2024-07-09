import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ImageUploadForm(props) {
  const [storeId, setStoreId] = useState(props.paramId);
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const navigate = useNavigate();

  const handleStoreIdChange = (e) => {
    setStoreId(e.target.value);
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    setImages(files);

    // Generate preview URLs for the selected images
    const imagePreviews = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );
    setPreviewImages(imagePreviews);
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

      // Redirect to a specific route after successful image upload
      navigate(`/web/login`);
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };

  return (
    <div className="mt-4">
      <h3 className="mb-3">Image Upload Form</h3>

      <form encType="multipart/form-data" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="storeId" className="form-label">
            Store ID:
          </label>
          <input
            type="text"
            className="form-control"
            name="storeId"
            value={storeId}
            onChange={handleStoreIdChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="mulimages" className="form-label">
            Select Images:
          </label>
          <input
            type="file"
            className="form-control"
            name="mulimages"
            multiple
            onChange={handleImageChange}
          />
        </div>

        {/* Display image previews */}
        <div className="mb-3">
          {previewImages.map((preview, index) => (
            <img
              key={index}
              src={preview}
              alt={`Preview ${index + 1}`}
              style={{
                maxWidth: "100px",
                maxHeight: "100px",
                marginRight: "5px",
              }}
            />
          ))}
        </div>

        <div className="mb-3">
          <button type="submit" className="btn btn-primary">
            Upload
          </button>
        </div>
      </form>
    </div>
  );
}

export default ImageUploadForm;
