import express from 'express';

const app = express();

let books = [
  {
    id: 1,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
  },
  {
    id: 2,
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
  },
  {
    id: 3,
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
  },
];

// GET list of books
app.get('/api/books', (req, res) => {
  res.json(books);
});

// DELETE book by Id
app.delete('api/books/:id' , (req, res) => {
  try {
    const { id } = req.params;
    const updatedBooks =  books.filter((book) => book.id!==parseInt(id));
    if (updatedBooks.length === books.length) {
      return res.status(404).json({ message: 'Book not found' });
    }
    books = updatedBooks
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
})

const server = app.listen(3030, () => {
  console.log('Server is listening on port 3030');
});

export { app, server };
