import React, { useState } from 'react';
import { Audio } from 'react-loader-spinner';
import { createNewItem } from '../../api';

const NewItemOverlay = ({ onClose }) => {
  const [loading, setLoading] = useState(false);

  const saveChanges = async (product, onClose) => {
    try {
      setLoading(true);
     // Check the input field is not empty
        if (document.getElementById('productNameInput').value === '' || document.getElementById('productPriceInput').value === '' || document.getElementById('productStockInput').value === '' || document.getElementById('productDescriptionInput').value === '') {
            alert('Please fill in all fields');
            return;

        }
        await createNewItem(
            document.getElementById('productNameInput').value,
            parseFloat(document.getElementById('productPriceInput').value),
            parseInt(document.getElementById('productStockInput').value),
            document.getElementById('productDescriptionInput').value
        );
      onClose();
    } catch (error) {
      console.error('Error updating document: ', error);
    }
    };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-gradient-to-r from-gray-200 to-gray-300 p-6 rounded-lg max-w-sm">
        <div className="text-center">
        </div>
        <div className="text-left">
          <div className="mb-4">
            <div>
            <label className="block font-semibold">Item Name:</label>
            <input type="text"  id="productNameInput" className="font-sans p-2 border-2 border-black " disabled={loading} style={{ borderColor: 'black' }} />
            </div>
          </div>
          <div className="flex justify-between mb-4">
            <div>
              <label className="block font-semibold">Price:</label>
              <input type="number" id="productPriceInput" disabled={loading} className="mr-2 w-13 border-2 border-black font-sans p-1" />
            </div>
            <div>
              <label className="block font-semibold">Stock:</label>
              <input type="number" id="productStockInput" disabled={loading} className="ml-2 w-12 border-2 border-black font-sans p-1" />
             
            </div>
          </div>
          <div className="mb-4">
            <label className="block font-semibold">Description:</label>
            <textarea id="productDescriptionInput" disabled={loading} className="h-24 w-full border-2 border-black font-sans p-2"></textarea>
          </div>
        </div>
        <div className="flex justify-center gap-x-4">
          <button onClick={onClose} disabled={loading} className="px-3 py-2 bg-red-500 text-white font-bold rounded-full transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg">Close</button>
          <button onClick={() => saveChanges(onClose)} disabled={loading} className="px-3 py-2 bg-gradient-to-r from-purple-500 to-blue-700 text-white font-bold rounded-full transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg">
            {loading ? (
              <Audio
                height={24}
                width={24}
                color="#FFFFFF"
                timeout={3000}
              />
            ) : (
              'Create new product'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewItemOverlay;
