import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ShowOffButton from './ShowOffButton';
import { fetchProductsByTag } from '../api';

function HomePage() {
  const [products, setProducts] = useState([]);
  const { keyWordString = "homepage" } = useParams();
  const [keyWords, setKeyWords] = useState([]);
  const navigate = useNavigate();

  const handleButtonClick = (product, index) => {
    navigate('/Item/' + product.id);
    console.log('SeaCucumber' + index + 'clicked!');
  };

  useEffect(() => {
    const keyWordsArray = keyWordString ? keyWordString.split(" ") : ["homepage"];
    setKeyWords(keyWordsArray.map((word) => word.toLowerCase()));
  }, [keyWordString]);

  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        const fetchedProducts = await fetchProductsByTag(keyWords);
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (keyWords.length > 0) {
      fetchProductsData();
    }
  }, [keyWords]);

  return (
    <div className="main bg-gray-100 grid grid-cols-1 sm:grid-cols-3 md:grid-col-4 justify-center">
      {products.map((product, index) => (
        <ShowOffButton
          key={index}
          alt="seacucumber"
          onClick={() => handleButtonClick(product, index)}
          product={product}
        />
      ))}
    </div>
  );
}

export default HomePage;
