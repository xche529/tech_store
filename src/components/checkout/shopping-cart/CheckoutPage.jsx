import React from 'react';

function Checkout() {
  return (
    <div>
      <h1>CHECKOUT</h1>
      <div id="cart">
      </div>
      <h2>Total: $<span id="total">0.00</span></h2>

      <h2>Shipping Information</h2>
      <form id="checkout-form">
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" required /><br />

        <label htmlFor="address">Address:</label>
        <input type="text" id="address" required /><br />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" required /><br />

        <button type="submit">Place Order</button>
      </form>

      <a href="/index.html">Back to Home</a>
    </div>
  );
}

export default Checkout;
