import React, { useState } from 'react';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../../../firebase-config';
import { Audio } from 'react-loader-spinner';
import 'firebase/firestore';
import '../../../css/product-overlay.css';
import UpdateImage from './UpdateImage';

const ProductOverlay = ({ product, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [hovered, setHovered] = useState(false); // Define 'hovered' state

  const saveChanges = async (product, onClose) => {
    try {
      setLoading(true);

      const productDocRef = doc(db, 'products', product.id);
      await updateDoc(productDocRef, {
        name: document.getElementById('productNameInput').value,
        price: parseFloat(document.getElementById('productPriceInput').value),
        stock: parseInt(document.getElementById('productStockInput').value),
        description: document.getElementById('productDescriptionInput').value 
      });
      console.log('Document successfully updated!');
      onClose();
    } catch (error) {
      console.error('Error updating document: ', error);
    } finally {
      setLoading(false);
    }
  };

  const handleHover = () => { 
    setHovered(true);
  };

  const handleMouseLeave = () => { 
    setHovered(false);
  };

  const updateImageUrl = (url) => {
    const productDocRef = doc(db, 'products', product.id);
    updateDoc(productDocRef, { imageUrl: url });
   };

  if (!product) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-gradient-to-r from-gray-200 to-gray-300 p-6 rounded-lg max-w-sm">
        <div className="text-center">
          <h2 className="text-lg font-bold">{product.name}</h2>
          <div 
            className="relative w-65 mx-auto my-4 cursor:pointer" 
            onMouseEnter={handleHover} 
            onMouseLeave={handleMouseLeave}
          >
            {hovered && (
              <div className="absolute cursor-pointer inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white">
                <UpdateImage product={product} onUpdateImage={updateImageUrl} />
                {/* <span className="text-lg">Update Image</span> */}
              </div>
            )}
            <img 
              className="w-full h-full object-cover rounded-lg" 
              src={product.imageUrl} 
              alt={product.name} 
            />
          </div>
        </div>
        <div className="text-left">
          <div className="mb-4">
            <div>
            <label className="block font-semibold">Item Name:</label>
            <input type="text" defaultValue={product.name} id="productNameInput" className="font-sans" disabled={loading} style={{ borderColor: 'black' }} />
            </div>
          </div>
          <div className="flex justify-between mb-4">
            <div>
              <label className="block font-semibold">Price:</label>
              <input type="number" defaultValue={product.price} id="productPriceInput" disabled={loading} className="input-field mr-2 w-13 border-2 border-black font-sans" />
            </div>
            <div>
              <label className="block font-semibold">Stock:</label>
              <input type="number" defaultValue={product.stock} id="productStockInput" disabled={loading} className="input-field ml-2 w-12 border-2 border-black font-sans" />
             
            </div>
          </div>
          <div className="mb-4">
            <label className="block font-semibold">Description:</label>
            <textarea defaultValue={product.description} id="productDescriptionInput" disabled={loading} className="input-field h-24 w-full border-2 border-black font-sans"></textarea>
          </div>
        </div>
        <div className="flex justify-center">
          <button onClick={onClose} disabled={loading} className="btn btn-secondary mr-4">Close</button>
          <button onClick={() => saveChanges(product, onClose)} disabled={loading} className="btn btn-primary">
            {loading ? (
              <Audio
                height={24}
                width={24}
                color="#FFFFFF"
                timeout={3000} // Optional timeout in milliseconds
              />
            ) : (
              'Save Changes'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductOverlay;





