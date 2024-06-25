import React, { useState} from 'react';
import { updateImage } from '../../api';

const AdminProductList = () => {
  const [products, setProducts] = useState([]);
  const [file, setFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

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
        const response = await updateImage(productId, file);
        console.log(response);
    
        setProducts((prevProducts) =>
            prevProducts.map((product) =>
            product.id === productId ? { ...product, imageURL: response.data } : product
            )
        );
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



