
import React from 'react';
import { useParams } from 'react-router-dom';
import books from '../../data/books';

const ProductPage = ({ addToCart }) => {
  const { id } = useParams();
  const book = books.find(book => book.id === id);

  if (!book) {
    return <h2>Book not found</h2>;
  }

  return (
    <div className="product-detail">
      <img src={book.image} alt={book.title} />
      <div className="product-detail-content">
        <h2>{book.title}</h2>
        <h3>by {book.author}</h3>
        <p>{book.description}</p>
        <p>Price: ${book.price.toFixed(2)}</p>
        <button onClick={() => addToCart(book)}>Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductPage;
