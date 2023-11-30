import React, { useState, forwardRef, useEffect } from 'react';
import SeaCucumber from '../images/SeaCucumber.jpg';
import ShowOffButton from './ShowOffButton';
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

    return content(products);
};


function content(products) {
    {/**/}
    const handleButtonClick = (index) => {

        console.log('SeaCucumber' + index + 'clicked!');
    };

    return (
        <div className='main'>
            {products.map((product, index) => (
                <ShowOffButton
                    key={index}
                    src={product.imageURL}
                    alt="SeaCucumber"
                    onClick={() => handleButtonClick(index)}
                    name={product.name}
                    price={product.price}
                    description={'好吃！'}
                />
            ))}
        </div>
    );
}

export default HomePage;