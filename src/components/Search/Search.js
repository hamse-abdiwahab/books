import React, { useState } from 'react';
import books from '../../data/books';
import { Link } from 'react-router-dom';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Search for Books</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by title or author..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="book-list">
        {filteredBooks.map(book => (
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

export default Search;