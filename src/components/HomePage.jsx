import React from 'react';
import SeaCucumber from '../images/SeaCucumber.jpg';
import ShowOffButton from './ShowoffButton';

function HomePage() {
    const handleButtonClick = () => {
        console.log('SeaCucumber clicked!');
    };
    return (
        <div>
            <ShowOffButton src = {SeaCucumber} alt = "meme" onClick = {handleButtonClick} />
        </div>
    );
}

export default HomePage;