import React from "react";
import { useState, useEffect } from "react";
import localforage from "localforage";

export default function ImageStorage() {
  const [image, setImage] = useState(null);

  useEffect(() => {
    const loadImage = async () => {
      const storedImage = await localforage.getItem("userImage");
      if (storedImage) {
        setImage(storedImage);
      }
    };
    loadImage();
  }, []);

  const handleUploadImage = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result;
      setImage(base64Image);
      await localforage.setItem("userImage", base64Image);
    };
    reader.readAsDataURL(file);
  };

  const handleClear = async () => {
    await localforage.removeItem("userImage");
    setImage(null);
  };

  return (
    <div className="upload-image-container">
      <h2 className="upload-image-label">Upload Image</h2>
      <input
        type="file"
        accept="image/*"
        onChange={handleUploadImage}
        className="upload-image"
      />

      {image && (
        <div className="preview-wrapper">
          <img src={image} alt="image" className="preview-img" />
        </div>
      )}
    </div>
  );
}
