import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase-config';
import ProductOverlay from './product-component/ProductOverlay';
import  Search  from './product-component/SearchArea';

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

        <div className="admin-product-list flex items-center justify-center">
         <Search onSearch={handleSearch} onCategoryChange={handleCategoryChange}  />
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-slate-200 cursor-pointer p-4 m-1 w-full transition-transform duration-300 transform hover:scale-105" onClick={() => setSelectedProduct(product)}>
          <h1 className="text-lg font-bold inline">{product.name}</h1>
          <h1 className="text-right float-right inline">${product.price}</h1>
            </div>
          ))}
          <ProductOverlay product={selectedProduct} onClose={() => setSelectedProduct(null)} />
        </div>
      );
      
      
};

export default AdminProductList;




