import React, { useState , useEffect} from "react";
import SeaCucumber from '../images/SeaCucumber.jpg';


const ImageWithFallback = ({ src, fallbackSrc, alt , className}) => {
    const [imageSrc, setImageSrc] = useState(src);

    useEffect(() => {
        setImageSrc(src);
    }, [src, fallbackSrc]);

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