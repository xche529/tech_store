const ImageWithFallback = ({ src, fallbackSrc, alt }) => {
    const [imageSrc, setImageSrc] = useState(src);

    const handleImageError = () => {
        setImageSrc(fallbackSrc);
    };

    return <img src={imageSrc} alt={alt} onError={handleImageError} />;
};

export default ImageWithFallback;