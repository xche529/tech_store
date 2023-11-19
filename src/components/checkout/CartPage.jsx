import React, { useState } from 'react';
import { Link } from 'react-router-dom';


function CartPage() {
  const [quantity, setQuantity] = useState(1);
  const price = 20.00;

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="cart-page">
        <div className="left-section">
          <div className="header">
            <h1>YOUR BAG</h1>
            <p className="item-count">{quantity} ITEM</p>
            <Link to="/">Continue Shopping</Link>
          </div>
          <table>
            <thead>
              <tr>
                <th>PRODUCT DETAILS</th>
                <th>QUANTITY</th>
                <th>PRICE</th>
                <th>TOTAL</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Product 1</td>
                <td>
                  <button onClick={decreaseQuantity}>-</button>
                  <span id="quantity">{quantity}</span>
                  <button onClick={increaseQuantity}>+</button>
                </td>
                <td>
                  <span id="price">${price.toFixed(2)}</span>
                </td>
                <td>
                  <span id="totalPrice">${(quantity * price).toFixed(2)}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="right-section">
          <h2>ORDER SUMMARY</h2>
          <div className="code-container">
            <p>ENTER PROMO CODE</p>
            <div className="code-input">
              <input type="text" placeholder="Promo Code" className="code-input" />
              <button className="apply-button">Apply</button>
            </div>
          </div>
          <table className="summary-table">
            <tbody>
              <tr>
                <td>Shipping</td>
                <td className="right-align">FREE</td>
              </tr>
              <tr>
                <td>Tax</td>
                <td className="right-align">$0.00</td>
              </tr>
              <tr>
                <td>Discount</td>
                <td className="right-align">${(quantity * price).toFixed(2)}</td>
              </tr>
              <tr>
                <td>Subtotal</td>
                <td className="right-align">${(quantity * price).toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
          <div className="checkout-container">
          <Link to="/checkout">
            <button className="checkout-button">Proceed to checkout</button>
          </Link>
          </div>
        </div>
      </div>
  );
}

export default CartPage;