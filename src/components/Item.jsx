import React from 'react';
import { useState , useEffect } from 'react';
import ImageWithFallback from './image';
import '../css/item.css';



function Item(props) {

  const [product, setProduct] = useState(props.product);
  const [imageSrc, setImageSrc] = useState(props.product.imageUrl);
  useEffect(() => {
      setProduct(props.product);
      setImageSrc(props.product.imageUrl);
  }, [props.product]);


  return (
    <div className='itemPage'>
      <ImageWithFallback className='itemImage' src={imageSrc} alt={"Seacucumber"} />
      <div className='infoBox'>
        <div>Product name: {product.name}</div>
        <div className='price'>Price: ${product.price}</div>
        <div>description: {product.description}</div>
      </div>

    </div>
  );
}

export default Item;
