import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import { collection, getDocs, where, query } from 'firebase/firestore';
import { db } from '../firebase-config';
import ShowOffButton from './ShowOffButton';
import { fetchProducts } from '../api';


function HomePage() {
    const [products, setProducts] = useState([]);
    const { keyWordString = "homepage" } = useParams();
    const [keyWords, setKeyWords] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            setProducts([]);
            let q = collection(db, 'products');
            if (keyWords.length > 0) {
                q = query(q, where("tag", "array-contains-any", keyWords));
            }
            const data = await getDocs(q);
            setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        fetchProducts();
    }, [keyWords]);

    useEffect(() => {
        const keyWords = keyWordString ? keyWordString.split(" ") : ["homepage"];
        setKeyWords(keyWords.map((word) => word.toLowerCase()));
    }, [keyWordString]);

    const navigate = useNavigate(); 

    const handleButtonClick = (product, index) => {
        navigate('/Item/' + product.id);
        console.log('SeaCucumber' + index + 'clicked!');
    };

    return (
        <div className="main bg-gray-100 grid grid-cols-1 sm:grid-cols-3 md:grid-col-4 justify-center">
            {products.map((product, index) => (
                <ShowOffButton key={index} alt="seacucumber"  onClick={() => handleButtonClick(product, index)} product={product} />
            ))}
        </div>
    );
}

export default HomePage;


