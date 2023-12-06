import React from 'react';
import '../css/showOffButton.css';
import SeaCucumber from '../images/SeaCucumber.jpg';
import ImageWithFallback from './image';



function ShowOffButton({ alt, onClick, product  }) {
    return (
        <div className="button" onClick={onClick}>
            <ImageWithFallback className='image'
                src={product.imageUrl }
                fallbackSrc={SeaCucumber}
                alt={alt}
            />
            <div className='textInfo'>
                <div className="itemName">
                    {product.name}
                </div>
                <div className='price'>

                    {product.price? '$' + product.price : ''}
                </div>
            </div>
            
            <div className='discription'>
                {product.description}
            </div>
            <div className='id'>
            ID: {product.id}
            </div>
        </div>
    );
}
export default ShowOffButton;
