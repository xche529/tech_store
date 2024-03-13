// ImageUpdater.jsx
import React, { useState } from 'react';
import { storage } from '../../../firebase-config';

const UpdateImage = ({ product, onUpdateImage }) => {
  const [loading, setLoading] = useState(false);

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      setLoading(true);

        const storageRef = storage.ref();
        const fileRef = storageRef.child(`products/${product.id}`);
        await fileRef.put(file);
        const url = await fileRef.getDownloadURL();
        onUpdateImage(url);

      console.log('Image successfully updated.');
    } catch (error) {
      console.error('Error updating image: ', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.addEventListener('change', handleFileSelect);
    fileInput.click();
  };

  return (
    <div onClick={handleClick} className="relative w-65 mx-auto my-4 cursor-pointer">
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white cursor-pointer">
        <span className="text-lg">Update Image</span>
      </div>
      <img 
        className="w-full h-full object-cover rounded-lg" 
        src={product.imageUrl} 
        alt={product.name} 
      />
    </div>
  );
};

export default UpdateImage;

