import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase-config';
import ProductOverlay from './product-component/ProductOverlay';
import Search from './product-component/SearchArea';

const AdminProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  const productsRef = collection(db, 'products');

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getDocs(productsRef);
      const productsData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setProducts(productsData);
      setFilteredProducts(productsData);
    };

    fetchProducts();
  }, [productsRef]);

  useEffect(() => {
    // Filter products based on search term and category
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategory ? product.category === selectedCategory : true)
    );
    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, products]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
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
        {filteredProducts.map((product) => (
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
      {selectedProduct && (
        <ProductOverlay product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </div>
  );
};

export default AdminProductList;



