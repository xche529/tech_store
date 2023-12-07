import React from "react";
import { Link } from "react-router-dom";
// import "../css/product-overlay.css";



const ProductOverlay = ({ product, onClose }) => {
    if (!product) {
      return null;
    }
  
    return (
      <div className="product-overlay">
        {/* Display product details */}
        {/* ... */}
        <button onClick={onClose}>Close</button>
      </div>
    );
};
    export default ProductOverlay;

  