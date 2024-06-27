import React, { useState, useEffect } from 'react';
import ProductOverlay from './ProductOverlay';
import Search from './product-component/SearchArea';
import { fetchProducts } from '../../api';

const AdminProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12; 

  useEffect(() => {
    const fetchProductsData = async () => {
      const products = await fetchProducts();
      setProducts(products);
      setFilteredProducts(products);
    };

    fetchProductsData();
  }, []);

  useEffect(() => {
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategory ? product.category === selectedCategory : true)
    );
    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, products]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="mb-3">
        <h1 className="text-4xl font-bold font-montserrat text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text">Admin Dashboard</h1>
      </div>
      <div className="w-2/3 mb-4">
        <Search onSearch={handleSearch} onCategoryChange={handleCategoryChange} />
      </div>
      <div className="w-full flex flex-col items-center">
        {currentProducts.map((product) => (
          <div
            key={product.id}
            className="border-2 border-gray-400 cursor-pointer w-2/3 flex justify-between items-center hover:bg-gray-200 p-3"
            onClick={() => setSelectedProduct(product)}
          >
            <div>
              <h1 className="font-bold">{product.name}</h1>
            </div>
            <div>
              <h1>{product.price}</h1>
            </div>
          </div>
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
      {selectedProduct && (
        <ProductOverlay product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </div>
  );
};

export default AdminProductList;
