import React, { createContext, useReducer, useContext } from 'react';

const initialState = {
  cartItems: [],
};

const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const UPDATE_CART_ITEM = 'UPDATE_CART_ITEM';

const cartReducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const existingItem = state.cartItems.find(item => item.name === action.payload.name);

      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map(item =>
            item.name === action.payload.name ? { ...item, quantity: item.quantity + 1 } : item
          ),
        };
      } else {
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

    case UPDATE_CART_ITEM:
        return {
          ...state,
          cartItems: action.payload,
        }
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

  const getItemQuantity = itemName => {
    const item = state.cartItems.find(item => item.name === itemName);
    return item ? item.quantity : 0;
  };

  const updateCartItem = (updatedItems) => {
    dispatch({ type: UPDATE_CART_ITEM, payload: updatedItems });
  };
  return (
    <CartContext.Provider value={{ cartItems: state.cartItems, addToCart, removeFromCart, updateCartItem, getItemQuantity}}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
