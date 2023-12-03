import React from 'react';
import '../css/showOffButton.css';
import ImageWithFallback from './image';



function ShowOffButton({ fallbackSrc, alt, onClick, product  }) {
    return (
        <div className="button" onClick={onClick}>
            <ImageWithFallback className='image'
                src={product.imageUrl }
                fallbackSrc={fallbackSrc}
                alt={alt}
            />
            <div className='textInfo'>
                <div className="name">
                    {product.name}
                </div>
                <div className="price">
                    {product.price}
                </div>
            </div>
            
            <div className='discription'>
                {product.description}
            </div>
        </div>
    );
}
export default ShowOffButton;
