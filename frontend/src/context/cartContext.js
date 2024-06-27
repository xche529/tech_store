import React, { createContext, useReducer, useContext } from 'react';

const initialState = {
  cartItems: [],
};

const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';


const cartReducer = (state, action) => {
    switch (action.type) {
      case ADD_TO_CART:
        const existingItem = state.cartItems.find(item => item.id === action.payload.id);
  
        if (existingItem) {
          // Item exists, update quantity by incrementing by 1
          return {
            ...state,
            cartItems: state.cartItems.map(item =>
              item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
            ),
          };
        } else {
          // Item does not exist, add as new item with quantity 1
          const newItem = { ...action.payload, quantity: 1 };
          return {
            ...state,
            cartItems: [...state.cartItems, newItem],
          };
        }
  
      case REMOVE_FROM_CART:
        return {
          ...state,
          cartItems: state.cartItems.filter(item => item.id !== action.payload),
        };
  
      default:
        return state;
    }
  };
  
  
  

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (product) => {
    dispatch({ type: ADD_TO_CART, payload: product });
  };

  const removeFromCart = (productId) => {
    dispatch({ type: REMOVE_FROM_CART, payload: productId });
  };

  return (
    <CartContext.Provider value={{ cartItems: state.cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);