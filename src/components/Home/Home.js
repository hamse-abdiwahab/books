import React from 'react';
import books from '../../data/books';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div>
      <header className="home-header">
        <h1>Welcome to the Bookstore</h1>
        <p>Discover your next favorite book!</p>
      </header>
      
      <div className="book-list">
        {books.map(book => (
          <div key={book.id} className="book-card">
            <Link to={`/product/${book.id}`}>
              <img src={book.image} alt={book.title} />
              <div className="book-card-content">
                <h3>{book.title}</h3>
                <p>{book.author}</p>
                <p>${book.price.toFixed(2)}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;