// import React, { useState } from "react";
// import {
//   getAuth,
//   signInWithEmailAndPassword,
//   GoogleAuthProvider,
//   signInWithPopup,
//   createUserWithEmailAndPassword,
// } from "firebase/auth";
// import { updateQuantity } from "../../api";

// function Cart({ closeCart, userDetail }) {
//   const update = async (itemId, value) => {
//     const email = userDetail.email;
//     itemId = '23'
//     value = 50
//     console.log(itemId, value, email);
//     const response = await updateQuantity(itemId, value, email);
//     console.log(response);
//   };

//   const test = () => {
//     console.log(userDetail);
//   }

//   return (
//     <div
//       onClick={closeCart}
//       className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50"
//     >
//       <div
//         onClick={(e) => e.stopPropagation()}
//         className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full"
//       >
//         <button onClick={update}> hi</button>
//         <h1></h1>
//         <button onClick={test}> test </button>
//       </div>
//     </div>
//   );
// }

import React from 'react';
import { useCart } from '../../context/cartContext'; // Assuming your CartContext is correctly implemented
import { updateQuantity } from '../../api'; // Ensure updateQuantity function is correctly implemented

function Cart({ closeCart }) {
  const { cartItems, removeFromCart, updateCartItem } = useCart(); // Access cartItems, removeFromCart, and updateCartItem from CartContext

  // Function to update quantity
  const update = async (itemId, newQuantity) => {
    try {
      // Update locally first
      const updatedItems = cartItems.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      );
      updateCartItem(updatedItems); // Update context with new quantity

      // Call API to update quantity on the server
      const response = await updateQuantity(itemId, newQuantity);
      console.log(response); // Optionally handle response from API
    } catch (error) {
      console.error('Error updating quantity:', error);
      // Handle error as needed (e.g., rollback changes, display error message)
    }
  };

  return (
    <div
      onClick={closeCart}
      className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full"
      >
        <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {cartItems.map((item) => (
              <li key={item.id} className="flex py-2">
                <div className="flex-shrink-0 w-20 h-20 mr-4">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-lg font-semibold">{item.name}</p>
                  <p className="text-gray-500">Price: ${item.price}</p>
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 font-medium mr-4"
                    >
                      Remove
                    </button>
                    <div className="flex items-center border border-gray-300 rounded-md px-3">
                      <button
                        onClick={() => update(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className={`text-gray-400 ${item.quantity <= 1 && 'cursor-not-allowed'}`}
                      >
                        -
                      </button>
                      <span className="mx-2">{item.quantity}</span>
                      <button
                        onClick={() => update(item.id, item.quantity + 1)}
                        className="text-gray-400"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
        <div>
            <p className="text-xl mt-4 font-bold">Total: ${cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}</p>
        </div>
        <div className='flex flex-col gap-y-4 mt-2'>
            <button className='px-4 py-2 bg-gray-200 text-gray-800 rounded-md font-medium hover:bg-gray-300 transition duration-200 '>
                Checkout
            </button>
        <button
            onClick={closeCart}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md font-medium hover:bg-gray-300 transition duration-200"
          >
            Close
            </button>
         </div>
        </div>

     </div>

  )};
export default Cart;

