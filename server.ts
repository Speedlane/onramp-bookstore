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

app.get('/api/books', (req, res) => {
  res.json(books);
});

app.delete('/api/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const initialLength = books.length;
  books = books.filter((book) => book.id !== id);
  
  if (books.length < initialLength) {
    res.status(200).json({ message: 'Book deleted successfully' });
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

const server = app.listen(3030, () => {
  console.log('Server is listening on port 3030');
});

export { app, server };