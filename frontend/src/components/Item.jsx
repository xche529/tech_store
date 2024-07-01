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

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const fetchedItem = await getProductById(itemId);
        if (fetchedItem) {
          setItem(fetchedItem);
          setDescription(fetchedItem.description || defaultDescription);
          setImageSrc(fetchedItem.imageUrl);
        } else {
          console.log('Item not found');
        }
      } catch (error) {
        console.error('Error fetching item:', error);
      }
    };

    fetchItem();
  }, [itemId]);

  const handleClickAddToCart = (e) => {
    e.stopPropagation();
    
    if (item) {
      console.log(item.name)
      addToCart(item);
    }
  }

  if (item) {
    return (
        <div className='p-4 flex item-center bg-gray-200 rounded-lg border border-gray-400'>
        <ImageWithFallback className='w-2/5 mb-4 rounded-lg' src={imageSrc} alt={"Product"} />
        <div className='flex flex-col justify-between p-4 space-y-5'>
          <div className='space-y-6'>
            <div className='text-xl font-bold'>Product name: {item?.name}</div>
            <div className='text-xl font-bold text-purple-700'>Price: {item?.price ? '$' + item?.price : 'No price available'}</div>
            <div>
              <h3 className='text-lg font-bold'>Description:</h3>
              {description}
            </div>
          </div>
          <div className='flex flex-col gap-y-4 mt-auto'>
            <button className="relative px-2 py-2 border-2 border-purple-500 border-b-4 border-b-purple-700 text-black rounded-lg 
              shadow-md transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-purple-500 hover:border-transparent 
              hover:to-blue-700 hover:text-white hover:shadow-lg w-1/2" onClick={handleClickAddToCart}>Add to Cart</button>
            <button className='relative px-2 py-2 border-2 border-purple-500 border-b-4 border-b-purple-700 text-black rounded-lg 
              shadow-md transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-purple-500 hover:border-transparent 
              hover:to-blue-700 hover:text-white hover:shadow-lg w-1/2'><Link to={"/"} >Continue Shopping</Link></button>
          </div>
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

