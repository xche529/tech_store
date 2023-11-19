import React from 'react';
import '../css/showOffButton.css';


function ShowOffButton({ src, alt, onClick, name}) {
    return (
        <div className = "button" >
            <img className='image'
                src={src}
                alt={alt}
                style={{ cursor: 'pointer' }}
                onClick={onClick}
            />
            <div className = "name">
                {name}
            </div>
        </div>
    );
}
export default ShowOffButton;

