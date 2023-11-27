import React, { useImperativeHandle, useState, forwardRef } from 'react';
import SeaCucumber from '../images/SeaCucumber.jpg';
import ShowOffButton from './ShowOffButton';
import '../css/homePage.css';


const HomePage = forwardRef((props, ref) => {
    const homePageRef = React.useRef();

    useImperativeHandle(ref, () => ({
        hide: homePageRef.current.hide,
        show: homePageRef.current.show,
    }));

    return <Content ref={homePageRef} />;
});

function Content({ forwardedRef }) {

    const [isVisible, setIsVisible] = useState(true);

    const hide = () => {
        setIsVisible(false);
    };

    const show = () => {
        setIsVisible(true);
    };

    return (
        <div>
            {isVisible && content()}
            <button onClick={hide}>hide</button>
            <button onClick={show}>show</button>
        </div>
    );
}

function content() {

    const handleButtonClick = () => {
        console.log('SeaCucumber clicked!');
    };

    return (
        <div className='main'>

            {/* temporary list for effect */}
            <ShowOffButton src={SeaCucumber} alt="meme" onClick={handleButtonClick} name={'海参'} price={80} discription={'好吃！'} />
            <ShowOffButton src={SeaCucumber} alt="meme" onClick={handleButtonClick} name={'海参'} price={90} discription={'好吃！'} />
            <ShowOffButton src={SeaCucumber} alt="meme" onClick={handleButtonClick} name={'海参'} price={1000} discription={'好吃！'} />
            <ShowOffButton src={SeaCucumber} alt="meme" onClick={handleButtonClick} name={'海参'} price={200} discription={'好吃！'} />
            <ShowOffButton src={SeaCucumber} alt="meme" onClick={handleButtonClick} name={'海参'} price={70} discription={'好吃！'} />
            <ShowOffButton src={SeaCucumber} alt="meme" onClick={handleButtonClick} name={'海参'} price={400} discription={'好吃！'} />
            <ShowOffButton src={SeaCucumber} alt="meme" onClick={handleButtonClick} name={'海参'} price={200} discription={'好吃！'} />
            <ShowOffButton src={SeaCucumber} alt="meme" onClick={handleButtonClick} name={'海参'} price={99} discription={'好吃！'} />

        </div>
    );
}

export default HomePage;