import React from 'react';
import ImageWithFallback from './image';
import SeaCucumber from '../images/SeaCucumber.jpg';


function Item(product) {
  return (
    <div>
      <ImageWithFallback className='image'
        src={product.imageUrl}
        fallbackSrc={SeaCucumber}
        alt={"Seacucumber"}
      />
      <div>{product.name}</div>
      <div>{product.description}</div>
      <div>{product.price}</div>

    </div>
  );
}

export default Item;
