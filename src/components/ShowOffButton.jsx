import React from 'react';


function ShowOffButton({ src, alt, onClick }) {
    return (
        <img
            src={src}
            alt={alt}
            style={{ cursor: 'pointer' }}
            onClick={onClick}
        />
    );
}
export default ShowOffButton;

