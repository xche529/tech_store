import React from 'react';
import '../css/showOffButton.css';


function ShowOffButton({ src, alt, onClick, name, price, discription }) {
    return (
        <div className="button" >
            <img className='image'
                src={src}
                alt={alt}
                style={{ cursor: 'pointer' }}
                onClick={onClick}
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
                {discription}
            </div>
        </div>
    );
}
export default ShowOffButton;