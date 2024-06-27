import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ShowOffButton from './ShowOffButton';
import { fetchProductsByTag } from '../api';
import { useCart } from '../context/cartContext';

function HomePage() {
  const [products, setProducts] = useState([]);
  const { keyWordString = "homepage" } = useParams();
  const [keyWords, setKeyWords] = useState([]);
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12; // 3 rows of 4 products each

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

  const totalPages = Math.ceil(products.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <div className="flex flex-col items-center">
      <div className="main bg-gray-100 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 justify-center">
        {currentProducts.map((product, index) => (
          <ShowOffButton
            key={index}
            alt="seacucumber"
            onClick={() => handleButtonClick(product, index)}
            product={product}
            addToCart={addToCart}
          />
        ))}
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center mt-4">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 mx-2 bg-gray-300 text-gray-800 rounded-md font-medium hover:bg-gray-400 transition duration-200 ${currentPage === index + 1 ? 'bg-gray-400' : ''}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default HomePage;
