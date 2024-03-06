import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
import ShowOffButton from './ShowOffButton';
import Item from './Item';
import '../css/homePage.css';
import { collection, getDocs, where, query, limit, orderBy } from 'firebase/firestore';
import { db } from '../firebase-config';

function HomePage() {

    let productsRef = collection(db, 'products');
    //main page products list
    const [products, setProducts] = useState([]);

    const { keyWordString } = useParams();
 


    useEffect(() => {
        setProducts([])
        let keyWords = [];

        if (typeof keyWordString === 'string') {
            console.log(keyWordString)
            keyWords = keyWordString.split(" ");
            console.log(keyWords)

        }

        const fetchProducts = async (productsRef, keyWords) => {
            let q = productsRef;
            let data;

            if (keyWords.length > 0) {
                q = query(productsRef, where("tag", "array-contains-any", keyWords));
            }
            data = await getDocs(q);

            setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };

        fetchProducts(productsRef, keyWords);
    }, [keyWordString]);

    return Content(products);
};

function Content(products) {
    const navigate = useNavigate();

    const handleButtonClick = (product, index) => {
        navigate('/Item/' + product.id)
        console.log('SeaCucumber' + index + 'clicked!');
    };

    // return the list of products
    return (
        <>
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