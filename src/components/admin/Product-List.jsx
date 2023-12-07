import React, { useState, useEffect } from 'react';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from '../../firebase-config';
import { updateImage } from './update-image';
import ProductOverlay from './product-overlay';
import { deleteImage } from './delete-image';

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
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategory ? product.category === selectedCategory : true)
      );
      setFilteredProducts(filtered);
    }, [searchTerm, selectedCategory, products]);
  
    const onChangeImage = (e) => {
      const image = e.target.files[0];
      setFile(image);
  
      const reader = new FileReader();
      reader.onload = () => {
        const imageDataURL = reader.result;
        setPreviewImage(imageDataURL);
      };
      reader.readAsDataURL(image);
    };
  
    const handleImageUpload = async (productId) => {
      if (!file) {
        console.error('No file selected');
        return;
      }
  
      try {
        const downloadURL = await updateImage(productId, file);
        // Update the product document in Firestore with the image URL
        const productDoc = doc(db, 'products', productId);
        await updateDoc(productDoc, { imageUrl: downloadURL });
  
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === productId ? { ...product, imageUrl: downloadURL } : product
          )
        );
  
        // Reset file and preview image
        setFile(null);
        setPreviewImage(null);
      } catch (error) {
        console.error('Error handling image upload:', error.message);
      }
    };

    return (
        <div className="admin-product-list">
          {filteredProducts.map((product) => (
            <div key={product.id} className="admin-product-item" onClick={() => setSelectedProduct(product)}>
          <h1 className="product-name">{product.name}</h1>
          <h1 className='product-price'>Price: ${product.price}</h1>
            </div>
          ))}
          <ProductOverlay product={selectedProduct} onClose={() => setSelectedProduct(null)} />
        </div>
      );
      
      
};

export default AdminProductList;



