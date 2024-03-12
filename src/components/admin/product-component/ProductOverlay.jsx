import React from "react";
import '../../../css/product-overlay.css';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from "../../../firebase-config";
import 'firebase/firestore';

const saveChanges = async (product) => {
    try {
      const productDocRef = doc(db, 'products', product.id);
      await updateDoc(productDocRef, {
        name: product.name, 
        price: parseFloat(document.getElementById('productPriceInput').value), 
        stock: parseInt(document.getElementById('productStockInput').value), 
        description: document.getElementById('productDescriptionInput').value 
      });
      console.log('Document successfully updated!');
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  };
  

const ProductOverlay = ({ product, onClose }) => {
  if (!product) {
    return null;
  }

  const updateStock = (e) => {
    const stock = e.target.value;
    console.log(stock);
  };

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
              <input type="text" placeholder={product.name} id="productNameInput"/>
              </div>
              <div className="component">
                <div className="productPrice">
                  <span>Price: </span>
                  <input type="number" placeholder={product.price} id="productPriceInput"/>
                </div>
                <div className="productStock">
                  <span>Stock:</span>
                  <input type="number" placeholder={product.stock} onChange={updateStock} id="productStockInput" />
                </div>
               
                </div>  
                <div className="productDescription">
                <span>Description:</span>
              <input type="text" placeholder={product.description} onChange={updateStock} id="productDescriptionInput" />
              </div>
            </div>
            <div className="buttons">
            <button onClick={onClose}>Close</button>
            <button onClick={() => saveChanges(product)}>Save Changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductOverlay;





  