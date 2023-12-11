import React from "react";
import '../../../css/product-overlay.css';

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
              <input type="text" placeholder={product.name} />
              </div>
              <div className="component">
                <div className="item-detail">
                  <span>Price: </span>
                  <input type="text" placeholder={product.price} />
                </div>
                <div className="item-detail">
                  <span>Stock:</span>
                  <input type="text" placeholder={product.stock} onChange={updateStock} />
                </div>
               
                </div>  
                <div className="">
                <span>Description:</span>
              <input type="text" placeholder={product.description} onChange={updateStock} />
              </div>
            </div>
            <button onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductOverlay;





  