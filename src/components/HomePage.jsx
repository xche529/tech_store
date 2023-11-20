import React from 'react';
import SeaCucumber from '../images/SeaCucumber.jpg';
import ShowOffButton from './ShowOffButton';
import '../css/homePage.css';


function HomePage() {
    const handleButtonClick = () => {
        console.log('SeaCucumber clicked!');
    };
    return (
        <div className='main'>
            
            {/* temporary list for effect */}
            <ShowOffButton src={SeaCucumber} alt="meme" onClick={handleButtonClick} name={'海参'} price={80} />
            <ShowOffButton src={SeaCucumber} alt="meme" onClick={handleButtonClick} name={'海参'} price={90} />
            <ShowOffButton src={SeaCucumber} alt="meme" onClick={handleButtonClick} name={'海参'} price={1000} />
            <ShowOffButton src={SeaCucumber} alt="meme" onClick={handleButtonClick} name={'海参'} price={200} />
            <ShowOffButton src={SeaCucumber} alt="meme" onClick={handleButtonClick} name={'海参'} price={70} />
            <ShowOffButton src={SeaCucumber} alt="meme" onClick={handleButtonClick} name={'海参'} price={400} />
            <ShowOffButton src={SeaCucumber} alt="meme" onClick={handleButtonClick} name={'海参'} price={200} />
            <ShowOffButton src={SeaCucumber} alt="meme" onClick={handleButtonClick} name={'海参'} price={99} />

        </div>
    );
}

export default HomePage;