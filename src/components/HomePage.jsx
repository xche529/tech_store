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
            <ShowOffButton src = {SeaCucumber} alt = "meme" onClick = {handleButtonClick} name={'海参'}/>
            <ShowOffButton src = {SeaCucumber} alt = "meme" onClick = {handleButtonClick} name={'海参'}/>
            <ShowOffButton src = {SeaCucumber} alt = "meme" onClick = {handleButtonClick} name={'海参'}/>
            <ShowOffButton src = {SeaCucumber} alt = "meme" onClick = {handleButtonClick} name={'海参'}/>
            <ShowOffButton src = {SeaCucumber} alt = "meme" onClick = {handleButtonClick} name={'海参'}/>
            <ShowOffButton src = {SeaCucumber} alt = "meme" onClick = {handleButtonClick} name={'海参'}/>
            <ShowOffButton src = {SeaCucumber} alt = "meme" onClick = {handleButtonClick} name={'海参'}/>
            <ShowOffButton src = {SeaCucumber} alt = "meme" onClick = {handleButtonClick} name={'海参'}/>

        </div>
    );
}

export default HomePage;