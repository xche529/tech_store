import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import ImageWithFallback from './image';
import { getProductById, updateQuantity } from '../api';
import { useCart } from '../context/cartContext';
import { useAuth } from '../context/authContext';

function Item() {
  const { itemId } = useParams();
  const { addToCart } = useCart();
  const [item, setItem] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [description, setDescription] = useState(null);
  const { user } = useAuth();
  const defaultDescription = "Discover innovation at its finest with our cutting-edge product! Unfortunately, the detailed description is temporarily unavailable.";

  const handleClickAddToCart = (e) => {
    e.stopPropagation();
    addToCart(item);
    // if user logged in, add to cart in database
    if (user) {
      updateQuantity(user.email, item.id, 1);
      console.log('Adding to cart in database');
    }
  }

  useEffect(() => {
    const fetchItem = async () => {
      const fetchedItem = await getProductById(itemId);
      if (fetchedItem) {
        setItem(fetchedItem);
        setDescription(fetchedItem.description || defaultDescription);
      } else {
        console.log('Item not found');
      }
    };
    fetchItem();
  }, [itemId]);

  useEffect(() => {
    if (item) {
      setDescription(item.description || defaultDescription);
      setImageSrc(item.imageUrl);
    }
  }, [item]);

  if (item) {
    return (
      <div className='p-8 flex item-center  m-5 bg-gray-200 rounded-lg border border-gray-400'>
        <ImageWithFallback className='w-2/5 mb-4 rounded-lg' src={imageSrc} alt={"Product"} />
        <div className='flex flex-col w-full p-4 space-y-5'>
          <div className='text-xl font-bold'>Product name: {item?.name}</div>
          <div className='text-xl font-bold text-purple-700'>Price: {item?.price ? '$' + item?.price : 'No price available'}</div>
          <div>
            <h3 className='text-lg font-bold'>Description:</h3>
            {description}
          </div>
        </div>
        <div className='flex flex-col gap-4 mt-4'>
          <button className="relative px-2 py-2 border-2 border-purple-500 border-b-4 border-b-purple-700 text-black rounded-lg shadow-md transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-purple-500 hover:border-transparent hover:to-blue-700 hover:text-white hover:shadow-lg
          " onClick={handleClickAddToCart} >Add to Cart</button>
          <Link to="/" className='relative px-2 py-2 border-2 border-purple-500 border-b-4 border-b-purple-700 text-black rounded-lg shadow-md transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-purple-500 hover:border-transparent hover:to-blue-700 hover:text-white hover:shadow-lg'>Continue Shopping</Link>
        </div>
      </div>
    );
  } else {
    console.log('Item:', item);
    return (
      <h1 className='text-red-500 text-center'>Error! Please reload</h1>
    );
  }
}

export default Item;

