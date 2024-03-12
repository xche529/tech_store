import React, { useState, useEffect } from 'react';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from '../../firebase-config';
import { updateImage } from './product-component/UpdateImage';
import ProductOverlay from './product-component/ProductOverlay';
import  Search  from './product-component/SearchArea';
import '../../css/admin.css';
import '../../css/admin-search.css';

const AdminProductList = () => {
    const [products, setProducts] = useState([]);
    const [file, setFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
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

        <div className="admin-product-list">
         <Search onSearch={handleSearch} onCategoryChange={handleCategoryChange}  />
          {filteredProducts.map((product) => (
            <div key={product.id} className="admin-product-item" onClick={() => setSelectedProduct(product)}>
          <h1 className="product-name">{product.name}</h1>
          <h1 className="product-price">${product.price}</h1>
            </div>
          ))}
          <ProductOverlay product={selectedProduct} onClose={() => setSelectedProduct(null)} />
        </div>
      );
      
      
};

export default AdminProductList;




