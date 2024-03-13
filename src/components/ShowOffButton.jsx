import React from 'react';
import SeaCucumber from '../images/SeaCucumber.jpg';
import ImageWithFallback from './image';

function ShowOffButton({ alt, onClick, product }) {
  return (
    <div className="cursor-pointer bg-white w-80 h-100 flex flex-col justify-center items-center m-2 p-2 border border-gray-300 rounded-lg hover:scale-105 duration-300" onClick={onClick}>
      <div className="w-full flex justify-center items-center">
        <ImageWithFallback
          className='w-10/12 h-50 rounded-lg m-2'
          src={product.imageUrl}
          fallbackSrc={SeaCucumber}
          alt={alt}
        />
      </div>
      <div className='p-5 gap-3 flex flex-col justify-center items-center'>
        <div className="text-xl font-semibold text-center">
          {product.name}
        </div>
        <div className="w-20 h-7 bg-blue-500 flex justify-center items-center text-white font-bold text-md py-0.5 px-2 rounded-full">
          {product.price ? '$' + product.price : ''}
        </div>
      </div>
      <div className='description text-sm text-gray-600 mb-4'>
      </div>
      <div className='id text-xs text-gray-400'>
        ID: {product.id}
      </div>
    </div>
  );
}

export default ShowOffButton;









