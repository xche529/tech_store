import React from 'react';
import { Link } from 'react-router-dom';

function Item() {
  return (
    <div>
      <h4>这里是商品界面</h4>
      <Link to="/">主页</Link>
    </div>
  );
}

export default Item;
