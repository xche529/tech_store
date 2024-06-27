import React, { useState } from 'react';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase-config';
import { Audio } from 'react-loader-spinner';
import 'firebase/firestore';
import UpdateImage from './product-component/UpdateImage';

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
          <div className="relative mx-auto my-4 cursor:pointer max-h-60 sm:max-h-96 overflow-hidden" onMouseEnter={handleHover} onMouseLeave={handleMouseLeave}>
          <div className="relative w-64 h-64 mx-auto"> 
            {hovered && (
                   <UpdateImage product={product} onUpdateImage={updateImageUrl} />
            )}
           
          <img 
               className="absolute inset-0 w-full h-full object-cover rounded-lg" 
                src={product.imageUrl} 
                alt={product.name} 
           />
          </div>
          </div>
        </div>
        <div className="text-left">
          <div className="mb-4">
            <div>
            <label className="block font-semibold">Item Name:</label>
            <input type="text" defaultValue={product.name} id="productNameInput" className="font-sans p-4 border-2 border-black " disabled={loading} style={{ borderColor: 'black' }} />
            </div>
          </div>
          <div className="flex justify-between mb-4">
            <div>
              <label className="block font-semibold">Price:</label>
              <input type="number" defaultValue={product.price} id="productPriceInput" disabled={loading} className="mr-2 w-13 border-2 border-black font-sans p-1" />
            </div>
            <div>
              <label className="block font-semibold">Stock:</label>
              <input type="number" defaultValue={product.stock} id="productStockInput" disabled={loading} className="ml-2 w-12 border-2 border-black font-sans p-1" />
             
            </div>
          </div>
          <div className="mb-4">
            <label className="block font-semibold">Description:</label>
            <textarea defaultValue={product.description} id="productDescriptionInput" disabled={loading} className="h-24 w-full border-2 border-black font-sans p-2"></textarea>
          </div>
        </div>
        <div className="flex justify-center">
          <button onClick={onClose} disabled={loading} className="px-3 py-2 bg-red-500 text-white font-bold rounded-full transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg">Close</button>
          <button onClick={() => saveChanges(product, onClose)} disabled={loading} className="px-3 py-2 bg-gradient-to-r from-purple-500 to-blue-700 text-white font-bold rounded-full transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg">
            {loading ? (
              <Audio
                height={24}
                width={24}
                color="#FFFFFF"
                timeout={3000}
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





