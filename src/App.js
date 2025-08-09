import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home/Home';
import Search from './components/Search/Search';
import ProductPage from './components/ProductPage/ProductPage';
import Cart from './components/Cart/Cart';
import AdminPanel from './components/AdminPanel/AdminPanel';
import ContactUs from './components/ContactUs/ContactUs';
import './App.css';

function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (book) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === book.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...book, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (bookId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== bookId));
  };

  const updateQuantity = (bookId, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === bookId ? { ...item, quantity: parseInt(quantity) } : item
      )
    );
  };

  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <div className="logo">
            <Link to="/">Bookstore</Link>
          </div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/search">Search</Link>
            </li>
            <li>
              <Link to="/cart">Cart ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})</Link>
            </li>
            <li>
              <Link to="/admin">Admin</Link>
            </li>
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
          </ul>
        </nav>

        <main className="content">
          <Routes>
            <Route path="/search" element={<Search />} />
            <Route path="/product/:id" element={<ProductPage addToCart={addToCart} />} />
            <Route path="/cart" element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;