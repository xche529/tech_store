import React, { useState, useEffect } from 'react';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from '../../firebase-config';

const AdminProductList = () => {
  const [products, setProducts] = useState([]);
  const [file, setFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const productsRef = collection(db, 'products');

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getDocs(productsRef);
      setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    fetchProducts();
  }, []);

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
      // Upload the image to Firebase Storage
      const storageRef = ref(getStorage(), `product_images/${productId}`);
      await uploadBytes(storageRef, file);

      const downloadURL = await getDownloadURL(storageRef);

      // Update the product document in Firestore with the image URL
      const productDoc = doc(db, 'products', productId);
      await updateDoc(productDoc, { imageURL: downloadURL });
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === productId ? { ...product, imageURL: downloadURL } : product
        )
      );

      // Reset file and preview image
      setFile(null);
      setPreviewImage(null);
    } catch (error) {
      console.error('Error uploading image:', error.message);
    }
  };

  return (
    <div className="admin-product-list">
      {products.map((product) => (
        <div key={product.id} className="admin-product-item">
          <h2>Product List</h2>
          <h3>{product.name}</h3>
          <p>Price: ${product.price}</p>
          <p>Stock: {product.stock}</p>
          <img
            src={product.imageUrl || previewImage}
            alt={product.name}
            style={{ width: '100%', height: 'auto' }}
          />
          <label htmlFor={`imageInput-${product.id}`}>New Image:</label>
          <input
            id={`imageInput-${product.id}`}
            type="file"
            onChange={onChangeImage}
          />
          <button onClick={() => handleImageUpload(product.id)}>Submit</button>
        </div>
      ))}
    </div>
  );
};

export default AdminProductList;


