import React from 'react';

function ImageButton({ src, alt, onClick }) {
    return (
      <img
        src={src}
        alt={alt}
        style={{ cursor: 'pointer' }}
        onClick={onClick}
      />
    );
  }
  