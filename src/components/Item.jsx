import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import ImageWithFallback from './image';
import '../css/item.css';
import { collection, getDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase-config';



function Item() {

  const { itemId } = useParams();
  console.log('itemId:', itemId);
  const [item, setItem] = useState(null);
  const productsRef = collection(db, 'products');

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

  const [imageSrc, setImageSrc] = useState(null);
  const [description, setDescription] = useState(null);
  const defaultDescription = "Discover innovation at its finest with our cutting-edge product! Unfortunately, the detailed description is temporarily unavailable. Rest assured, this item boasts top-notch quality, functionality, and style. Embrace the mystery and trust that you're in for a delightful surprise when you experience the unparalleled features of this must-have product."
  const addToCart = () => {
    setDoc(doc(db, "cities", "LA"), {
      name: "Los Angeles",
      state: "CA",
      country: "USA"
    });
  }
  useEffect(() => {
    if (item) {
      { item.description ? setDescription(item.description) : setDescription(defaultDescription) }
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
        <div>
          <button className='itemButton' >Add to Cart</button>
          <button className='itemButton' >Save for Later</button>
          <Link to="/" className='link'>      <button className='goHome' >Continue Shopping</button>
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
