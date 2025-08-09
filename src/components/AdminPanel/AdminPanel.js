
import React, { useState } from 'react';
import initialBooks from '../../data/books';

const AdminPanel = () => {
  const [books, setBooks] = useState(initialBooks);
  const [newBook, setNewBook] = useState({
    id: '',
    title: '',
    author: '',
    description: '',
    price: '',
    image: '',
  });
  const [editingBookId, setEditingBookId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBook({ ...newBook, [name]: name === 'price' ? parseFloat(value) : value });
  };

  const handleAddBook = (e) => {
    e.preventDefault();
    if (editingBookId) {
      setBooks(books.map(book => (book.id === editingBookId ? newBook : book)));
      setEditingBookId(null);
    } else {
      setBooks([...books, { ...newBook, id: Date.now().toString() }]);
    }
    setNewBook({
      id: '',
      title: '',
      author: '',
      description: '',
      price: '',
      image: '',
    });
  };

  const handleEditClick = (book) => {
    setNewBook(book);
    setEditingBookId(book.id);
  };

  const handleDeleteBook = (id) => {
    setBooks(books.filter(book => book.id !== id));
  };

  return (
    <div>
      <h1>Admin Panel</h1>

      <h2>{editingBookId ? 'Edit Book' : 'Add New Book'}</h2>
      <form onSubmit={handleAddBook}>
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={newBook.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Author</label>
          <input
            type="text"
            name="author"
            placeholder="Author"
            value={newBook.author}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            name="description"
            placeholder="Description"
            value={newBook.description}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        <div>
          <label>Price</label>
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={newBook.price}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Image URL</label>
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={newBook.image}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">{editingBookId ? 'Update Book' : 'Add Book'}</button>
      </form>

      <h2>Existing Books</h2>
      <div className="book-list">
        {books.map(book => (
          <div key={book.id} className="book-card">
            <img src={book.image} alt={book.title} />
            <div className="book-card-content">
                <h3>{book.title}</h3>
                <p>{book.author}</p>
                <p>${book.price.toFixed(2)}</p>
                <div className="admin-book-actions">
                    <button onClick={() => handleEditClick(book)}>Edit</button>
                    <button onClick={() => handleDeleteBook(book.id)}>Delete</button>
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
