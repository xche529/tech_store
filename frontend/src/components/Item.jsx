import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import ImageWithFallback from './image';
import '../css/item.css';
import { getProductById } from '../api';

function Item() {
  const { itemId } = useParams();
  console.log('itemId:', itemId);
  const [item, setItem] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [description, setDescription] = useState(null);
  const defaultDescription = "Discover innovation at its finest with our cutting-edge product! Unfortunately, the detailed description is temporarily una"

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
        <div className='gap-4'>
          <button className="relative px-2 py-2 border-2 border-purple-500 border-b-4 border-b-purple-700 text-black rounded-lg shadow-md transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-purple-500 hover:border-transparent hover:to-blue-700 hover:text-white hover:shadow-lg">Add to Cart</button>
          <button className="relative px-2 py-2 border-2 border-purple-500 border-b-4 border-b-purple-700 text-black rounded-lg shadow-md transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-purple-500 hover:border-transparent hover:to-blue-700 hover:text-white hover:shadow-lg">Add to Watchlist</button>
          <Link to="/" className='link'>  <button className="relative px-2 py-2 border-2 border-purple-500 border-b-4 border-b-purple-700 text-black rounded-lg shadow-md transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-purple-500 hover:border-transparent hover:to-blue-700 hover:text-white hover:shadow-lg">Continue Shopping</button></Link>
        </div>
      </div>
    );
  } else {
    console.log('Item:', item);
    return (
      <h1>Error! Please reload</h1>
    );
  }
}

export default Item;
