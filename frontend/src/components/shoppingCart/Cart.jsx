import React, { useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { updateQuantity } from "../../api";

function Cart({ closeCart, userDetail }) {
  const update = async (itemId, value) => {
    const email = userDetail.email;
    itemId = '23'
    value = 50
    console.log(itemId, value, email);
    const response = await updateQuantity(itemId, value, email);
    console.log(response);
  };

  const test = () => {
    console.log(userDetail);
  }

  return (
    <div
      onClick={closeCart}
      className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full"
      >
        <button onClick={update}> hi</button>
        <h1></h1>
        <button onClick={test}> test </button>
      </div>
    </div>
  );
}

export default Cart;
