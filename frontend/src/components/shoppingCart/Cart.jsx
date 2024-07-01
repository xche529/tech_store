import React, { useState } from 'react';
import { useCart } from '../../context/cartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { updateQuantity, RemoveItemFromCart } from '../../api';


function Cart({ closeCart, userDetail}) {
  const { cartItems, removeFromCart, updateCartItem } = useCart();
  const [isCheckout, setIsCheckout] = useState(false);

  const handleCheckout = () => {
    setIsCheckout(true);
    updateCartItem([]);
  };

  const handleRemoveItem = async (itemId) => {
    const email = userDetail.email;

    // Only call the API if the user is logged in
    if (!email) {
      return;
    }
    const response = await RemoveItemFromCart(itemId, email);
    console.log(response);
    removeFromCart(itemId);
    };

  const update = async (itemId, newQuantity) => {
    const updatedItems = cartItems.map(item =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    updateCartItem(updatedItems);

    const email = userDetail.email;
    const response = await updateQuantity(itemId, newQuantity, email);
    console.log(response);
  };

  const decreaseQuantity = (itemId, currentQuantity) => {
    if (currentQuantity > 1) {
      update(itemId, currentQuantity - 1);
    }
  };

  const increaseQuantity = (itemId, currentQuantity) => {
    update(itemId, currentQuantity + 1);
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
        {isCheckout ? (
          <div className="text-center">
            <p className="text-xl font-bold mb-4">Thank you for your purchase!</p>
            <button
              onClick={closeCart}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md font-medium hover:bg-gray-300 transition duration-200"
            >
              Close
            </button>
          </div>
        ) : (
          <>
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
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-red-500 hover:text-red-700 font-medium mr-4"
                        >
                          Remove
                        </button>
                        <div className="flex items-center border border-gray-300 rounded-md px-3">
                          <button
                            onClick={() => decreaseQuantity(item.id, item.quantity)}
                            disabled={item.quantity <= 1}
                            className={`text-gray-400 ${item.quantity < 1 && 'cursor-not-allowed'}`}
                          >
                            -
                          </button>
                          <span className="mx-2">{item.quantity}</span>
                          <button
                            onClick={() => increaseQuantity(item.id, item.quantity)}
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
              <p className="text-xl mt-4 font-bold">
                Total: ${cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}
              </p>
            </div>
            <div className='flex flex-col gap-y-4 mt-2'>
              <button
                onClick={handleCheckout}
                className='checkout-button px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-700 text-white font-bold rounded-md font-medium transition hover:scale-105'
              >
                <FontAwesomeIcon icon={faCreditCard} className='mr-2' />
                Checkout
              </button>
              <button
                onClick={closeCart}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md font-medium hover:bg-gray-300 transition duration-200"
              >
                Close
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;



