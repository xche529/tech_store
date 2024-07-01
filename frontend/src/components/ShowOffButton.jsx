import React from 'react';
import SeaCucumber from '../images/SeaCucumber.jpg';
import ImageWithFallback from './image';
import { useCart } from '../context/cartContext';

function ShowOffButton({ alt, product, onClick }) {
    const { addToCart } = useCart();

    const handleClickAddToCart = (e) => {
        e.stopPropagation();
        addToCart(product);
        }
            

  return (
    <div className="cursor-pointer bg-white w-80 h-100 flex flex-col justify-center items-center m-2 p-2 border border-gray-300 rounded-lg hover:bg-gray-200 transition ease-in-out">
      <div className="w-full flex justify-center items-center">
        <ImageWithFallback
          className='w-10/12 h-50 rounded-lg m-2'
          src={product.imageUrl}
          fallbackSrc={SeaCucumber}
          alt={alt}
        />
      </div>
      <div className='p-5 gap-3 flex flex-col justify-center items-center'>
        <div className="text-lg font-semibold text-center">
          {product.name}
        </div>
        <div className="w-20 h-7 flex justify-center items-center text-blue-500 text-3xl font-bold text-md py-0.5 px-2 rounded-full">
          {product.price ? '$' + product.price : ''}
        </div>
      </div>
      <div className='description text-sm text-gray-600 mb-4'>
      </div>
      <div className='flex justify-center items-center space-x-4 mb-3'>
      <button
          onClick={handleClickAddToCart}
          className="relative px-2 py-2 border-2 border-purple-500 border-b-4 border-b-purple-700 text-black rounded-full shadow-md transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-purple-500 hover:border-transparent hover:to-blue-700 hover:text-white hover:shadow-lg"
        >
          Add to Cart
        </button>
        <button
          className="relative px-2 py-2 border-2 border-purple-500 border-b-4 border-b-purple-700 text-black rounded-full shadow-md transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-purple-500 hover:border-transparent hover:to-blue-700 hover:text-white hover:shadow-lg"
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
        >
          Show More
        </button>
      </div>
    </div>
  );
}

export default ShowOffButton;









