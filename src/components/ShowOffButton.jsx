import React from 'react';
import '../css/showOffButton.css';
import ImageWithFallback from './image';



function ShowOffButton({ src, fallbackSrc, alt, onClick, name, price, description }) {
    return (
        <div className="button" onClick={onClick}>
            <ImageWithFallback className='image'
                src={src}
                fallbackSrc={fallbackSrc}
                alt={alt}
            />
            <div className='textInfo'>
                <div className="name">
                    {name}
                </div>
                <div className="price">
                    ${price}
                </div>
            </div>
            
            <div className='discription'>
                {description}
            </div>
        </div>
    );
}
export default ShowOffButton;
