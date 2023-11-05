import React from 'react';
import meme from './images/meme.jpg';

function MainPage() {
  return (
    <div className="main-page">
      <div className="text-with-image">
        <p className="text" style={{ fontSize: '24px' }}>
          欢迎来到UOA线上超商
        </p>
        <img className="image" src={meme}/>
      </div>
      <br />
      <a href="/shopping-cart/CartPage" target="_self">
        购物车
      </a>
      <a href="/items" target="_self">
        商品
      </a>
      <a href="/checkout" target="_self">
        结算
      </a>
      <a href="/" target="_self">
        主页
      </a>
    </div>
  );
}

export default MainPage;
