import React from 'react';
import ImageWithFallback from './image';
import SeaCucumber from '../images/SeaCucumber.jpg';
import '../css/item.css';



function Item(props) {

  const { product } = props;

  return (
    <div>
      <ImageWithFallback className='image'
        src={product.imageUrl}
        alt={"Seacucumber"}
      />
      <div className='infoBox'>
      <div>product name: {product.name}</div>
      <div>description: {product.description}</div>
      <div>price: {product.price}</div>
      </div>

    </div>
  );
}

export default Item;
