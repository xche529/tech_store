import React, { useState } from 'react';
import UploadImage from './UploadImage';


const UpdateImage = ({ product, onUpdateImage }) => {
  const [loading, setLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('Upload your file to our website');

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      setLoading(true);
      setUploadStatus('Uploading your file...');

    const downloadUrl =  await UploadImage({ file });

    } catch (error) {
      console.error('Error updating image:', error);
      setUploadStatus('Error uploading image.');
    } finally {
      setLoading(false);
      setTimeout(() => setUploadStatus('Upload your file to our website'), 3000); // Reset status after 3 seconds
    }
  };

  const clickImage = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.addEventListener('change', handleFileSelect); // Attach event listener here
    fileInput.click();
  };

  return (
    <div className="absolute cursor-pointer inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white" style={{ zIndex: 1 }} onClick={clickImage}>
    <div className="relative w-60 mx-auto my-4 cursor-pointer">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white cursor-pointer">
          <div role="status">
            <svg className="w-8 h-8 animate-spin" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 4.418 3.582 8 8 8v-4c-1.654 0-3.17-.636-4.308-1.709l1.618-1.618zm2.582-2.582l-1.618 1.618A3.95 3.95 0 004 12h4c0-.782.293-1.49.766-2.032L8.582 14.709z"></path>
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white cursor-pointer">
        <span className="text-lg">{loading ? 'Uploading...' : 'Update Image'}</span>
      </div>
    </div>
</div>
  );
};

export default UpdateImage;



