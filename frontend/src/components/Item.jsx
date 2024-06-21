import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import ImageWithFallback from './image';
import '../css/item.css';
import { collection, getDoc, doc, setDoc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../firebase-config';
import { useAuth } from '../context/authContext';


function Item() {
  const { user } = useAuth();
  const { itemId } = useParams();
  console.log('itemId:', itemId);
  const [item, setItem] = useState(null);

  // fetch item from database with itemId
  useEffect(() => {
    const getItemById = async () => {
      try {
        const itemDoc = await getDoc(doc(db, 'products', itemId));

        if (itemDoc.exists) {
          setItem(itemDoc.data());
          console.log('Item found');
        } else {
          console.log('Item not found');
        }
      } catch (error) {
        console.error('Error fetching item:', error.message);
      }
    };
    getItemById();
  }, [itemId]);

  useEffect(() => {
    if (item) {
      { item.description ? setDescription(item.description) : setDescription(defaultDescription) }
      setImageSrc(item.imageUrl);
    }
  }, [item]);


  const [imageSrc, setImageSrc] = useState(null);
  const [description, setDescription] = useState(null);
  const defaultDescription = "Discover innovation at its finest with our cutting-edge product! Unfortunately, the detailed description is temporarily unavailable. Rest assured, this item boasts top-notch quality, functionality, and style. Embrace the mystery and trust that you're in for a delightful surprise when you experience the unparalleled features of this must-have product."
  
  const addToCart = async () => {
    if (user) {
      const cartRef = doc(db, 'users', user.email, 'cart', itemId);
      const cartDoc = await getDoc(cartRef, 'quantity');
      console.log('cartDoc:', cartDoc);
      // if item already exists in cart, increment quantity by 1
      if (cartDoc.exists()) {
        await updateDoc(cartRef, {
          quantity: increment(1)
        });
        console.log('quantity updated');
      }else{
        await setDoc(cartRef, {
          quantity: increment(1)
        });
        console.log('quantity set');
      }
    }
  }


  if (item) {
    console.log('Item:', item, 'user:', user);
    return (
      <div className='itemPage'>
        <ImageWithFallback className='itemImagei' src={imageSrc} alt={"Seacucumber"} />
        <div className='infoBox'>
          <div className='itemName'>Product name: {item?.name}</div>
          <div className='itemPrice'>Price: {item?.price ? '$' + item?.price : 'No price available'}</div>
          <div>
            <h3>Description:</h3>
            {description}
          </div>
        </div>
        <div>
        <button className="relative px-2 py-2 border-2 border-purple-500 border-b-4 border-b-purple-700 text-black rounded-lg shadow-md transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-purple-500 hover:border-transparent hover:to-blue-700 hover:text-white hover:shadow-lg">Add to Cart</button>
          <button className="relative px-2 py-2 border-2 border-purple-500 border-b-4 border-b-purple-700 text-black rounded-lg shadow-md transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-purple-500 hover:border-transparent hover:to-blue-700 hover:text-white hover:shadow-lg">Add to Watchlist</button>
          <Link to="/" className='link'>  <button className="relative px-2 py-2 border-2 border-purple-500 border-b-4 border-b-purple-700 text-black rounded-lg shadow-md transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-purple-500 hover:border-transparent hover:to-blue-700 hover:text-white hover:shadow-lg">Continue Shopping</button>
          </Link>
        </div>
      </div>
    );
  } else {
    console.log('Item:', item);
    return (
      <h1>Error! please reload</h1>
    );
  }
}

export default Item;
