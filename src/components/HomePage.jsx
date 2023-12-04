import React, { useState, useEffect } from 'react';
import ShowOffButton from './ShowOffButton';
import Item from './Item';
import '../css/homePage.css';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase-config';

function HomePage() {
    const productsRef = collection(db, 'products');
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const data = await getDocs(productsRef);
            setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };

        fetchProducts();
    }, []);

    return Content(products);
};


function Content(products) {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const handleButtonClick = (product, index) => {
        setSelectedProduct(product);
        console.log('SeaCucumber' + index + 'clicked!');
    };

    return (
        <>
            {selectedProduct && <Item product={selectedProduct} />}

            <div className='main'>

                {products.map((product, index) => (
                    <ShowOffButton
                        key={index}
                        alt="seacucumber"
                        onClick={() => handleButtonClick(product, index)}
                        product={product}
                    />
                ))}
            </div>
        </>
    );
}

export default HomePage;