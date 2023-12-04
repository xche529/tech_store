import React, { useState } from "react";
import SeaCucumber from '../images/SeaCucumber.jpg';


const ImageWithFallback = ({ src, fallbackSrc, alt , className}) => {
    const [imageSrc, setImageSrc] = useState(src);

    const handleImageError = () => {
        setImageSrc(fallbackSrc);
        console.log('image error');
    };

    if (!imageSrc) {
        handleImageError();
        if (!fallbackSrc) {
            setImageSrc(SeaCucumber);
        }
    }


    return <img src={imageSrc} alt={alt} onError={handleImageError} className={className}/>;
};

export default ImageWithFallback;