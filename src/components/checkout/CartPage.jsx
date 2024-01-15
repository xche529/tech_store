import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, getDoc, doc, updateDoc, increment, deleteDoc} from 'firebase/firestore';
import { db } from '../../firebase-config';
import { useAuth } from '../../context/authContext';



function CartPage() {
  const { user } = useAuth();

  async function increaseQuantity(itemId) {
    const cartRef = doc(db, 'users', user.email, 'cart', itemId);
    await updateDoc(cartRef, {
      quantity: increment(1)
    });
    console.log('quantity updated');
    fetchCart()
  };

  async function decreaseQuantity(itemId) {
    const cartRef = doc(db, 'users', user.email, 'cart', itemId);
    await updateDoc(cartRef, {
      quantity: increment(-1)
    });
    console.log('quantity updated');
    fetchCart()
  };

  async function removeItem(itemId) {
    const cartRef = doc(db, 'users', user.email, 'cart', itemId);
    await deleteDoc(cartRef);
    console.log('item removed');
    fetchCart()
  }


  const [cart, setCarts] = useState([]);
  const [total, setTotal] = useState(0);
  const [tax, setTax] = useState(0);

  const fetchCart = async () => {
    try {
      const cartRef = collection(db, 'users', user.email, 'cart')
      const cartData = await getDocs(cartRef);

      const updatedCart = await Promise.all(cartData.docs.map(async (product) => {
        try {
          const itemDoc = await getDoc(doc(db, 'products', product.id));
          if (itemDoc.exists) {
            return { ...product.data(), id: product.id, name: itemDoc.data().name, price: itemDoc.data().price, imageUrl: itemDoc.data().imageUrl };
          } else {
            console.log('Item not found');
            return null;
          }
        } catch (error) {
          console.error('Error fetching item:', error.message);
          return null;
        }
      }));

      setCarts(updatedCart.filter((item) => item !== null));
      let totalCost = 0;
      let taxCost = 0;
      for (let i = 0; i < cart.length; i++) {
        totalCost += updatedCart[i].price * updatedCart[i].quantity;
        taxCost += updatedCart[i].price * updatedCart[i].quantity * 0.15;
      }
      setTotal(totalCost.toFixed(2));
      setTax(taxCost.toFixed(2));

    } catch {
      console.log('error');
    }
  };

  useEffect(() => {
    if (user) {
      fetchCart();
    }
  },[]);


  if (!user) {
    return (
      <h1>Please login first!</h1>
    );
  } else {
    console.log('cart', cart)
    return (
      <div className="cart-page">
        <div className="left-section">
          <div className="header">
            <h1>YOUR BAG</h1>
            <p className="item-count">{ } ITEM</p>
            <Link to="/">Continue Shopping</Link>
          </div>
          <table>
            <thead>
              <tr>
                <th>PRODUCT DETAILS</th>
                <th>QUANTITY</th>
                <th>PRICE</th>
                <th>TOTAL</th>
                <th>REMOVE</th>
              </tr>
            </thead>
            <tbody>

              {cart.map(item => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>
                    <button onClick={() => decreaseQuantity(item.id)} className='numberButton'>-</button>
                    <span id="quantity">{item.quantity}</span>
                    <button onClick={() => increaseQuantity(item.id)} className='numberButton'>+</button></td>
                  <td>${item.price}</td>
                  <td>${item.price * item.quantity}</td>
                  <td><button onClick={() => removeItem(item.id)} className="remove-button" >X</button></td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>
        <div className="right-section">
          <h2>ORDER SUMMARY</h2>
          <div className="code-container">
            <p>ENTER PROMO CODE</p>
            <div className="code-input">
              <input type="text" placeholder="Promo Code" className="code-input" />
              <button className="apply-button">Apply</button>
            </div>
          </div>
          <table className="summary-table">
            <tbody>
              <tr>
                <td>Shipping</td>
                <td className="right-align">FREE</td>
              </tr>
              <tr>
                <td>Tax</td>
                <td className="right-align">${tax}</td>
              </tr>
              <tr>
                <td>Discount</td>
                <td className="right-align">${0}</td>
              </tr>
              <tr>
                <td>Subtotal</td>
                <td className="right-align">${total}</td>
              </tr>
            </tbody>
          </table>
          <div className="checkout-container">
            <Link to="/checkout">
              <button className="checkout-button">Proceed to checkout</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default CartPage;