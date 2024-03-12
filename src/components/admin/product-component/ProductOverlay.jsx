import React, { useState } from 'react';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../../../firebase-config';
import { Audio } from 'react-loader-spinner';
import 'firebase/firestore';
import '../../../css/product-overlay.css';

const ProductOverlay = ({ product, onClose }) => {
  const [loading, setLoading] = useState(false);

  const saveChanges = async (product, onClose) => {
    try {
      setLoading(true); // Set loading state to true when starting the update process

      const productDocRef = doc(db, 'products', product.id);
      await updateDoc(productDocRef, {
        name: document.getElementById('productNameInput').value,
        price: parseFloat(document.getElementById('productPriceInput').value),
        stock: parseInt(document.getElementById('productStockInput').value),
        description: document.getElementById('productDescriptionInput').value 
      });
      console.log('Document successfully updated!');
      onClose(); // Close the overlay after changes are saved
    } catch (error) {
      console.error('Error updating document: ', error);
    } finally {
      setLoading(false); // Reset loading state regardless of success or failure
    }
  };

  if (!product) {
    return null;
  }

  return (
    <div className="product-overlay">
      <div className="overlay-background">
        <div className="overlay-container">
          <div className="overlay-content">
            <h2>{product.name}</h2>
            <img className="product-image" src={product.imageUrl} alt={product.name} />
            <div className="product-description">
              <div className="">
                <label>
                  Item Name: 
                </label>
                <input type="text" placeholder={product.name} id="productNameInput" disabled={loading}/>
              </div>
              <div className="component">
                <div className="productPrice">
                  <span>Price: </span>
                  <input type="number" placeholder={product.price} id="productPriceInput" disabled={loading}/>
                </div>
                <div className="productStock">
                  <span>Stock:</span>
                  <input type="number" placeholder={product.stock} id="productStockInput" disabled={loading}/>
                </div>
              </div>  
              <div className="productDescription">
                <span>Description:</span>
                <input type="text" placeholder={product.description} id="productDescriptionInput" disabled={loading}/>
              </div>
            </div>
            <div className="buttons">
              <button onClick={onClose} disabled={loading}>Close</button>
              <button onClick={() => saveChanges(product, onClose)} disabled={loading}>
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
      </div>
    </div>
  );
};

export default ProductOverlay;

