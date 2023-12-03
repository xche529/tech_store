import React, { useState } from "react";

const ImageWithFallback = ({ src, fallbackSrc, alt , className}) => {
    const [imageSrc, setImageSrc] = useState(src);

    const handleImageError = () => {
        setImageSrc(fallbackSrc);
        console.log('image error');
    };

    return <img src={imageSrc} alt={alt} onError={handleImageError } className={className}/>;
};

export default ImageWithFallback;