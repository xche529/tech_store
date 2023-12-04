import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ImageWithFallback from './image';
import '../css/item.css';



function Item(props) {

  const [product, setProduct] = useState(props.product);
  const [imageSrc, setImageSrc] = useState(props.product.imageUrl);
  const [description, setDescription] = useState(props.product.description);
  const defaultDescription = "Discover innovation at its finest with our cutting-edge product! Unfortunately, the detailed description is temporarily unavailable. Rest assured, this item boasts top-notch quality, functionality, and style. Embrace the mystery and trust that you're in for a delightful surprise when you experience the unparalleled features of this must-have product."

  useEffect(() => {
    setProduct(props.product);
    setImageSrc(props.product.imageUrl);
    { props.product.description ? setDescription(props.product.description) : setDescription(defaultDescription) }
  }, [props.product]);


  return (
    <div className='itemPage'>
      <ImageWithFallback className='itemImagei' src={imageSrc} alt={"Seacucumber"} />
      <div className='infoBox'>
        <div className='name'>Product name: {product.name}</div>
        <div className='price'>Price: ${product.price}</div>
        <div>description: {description}</div>
      </div>
      <div>
        <button className='itemButton' >Add to Cart</button>
        <button className='itemButton' >Save for Later</button>
        <Link to="/" className='link'>      <button className='goHome' >Continue Shopping</button>
        </Link>
      </div>
    </div>
  );
}

export default Item;
