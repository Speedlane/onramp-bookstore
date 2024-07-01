import express from 'express';

const app = express();

type Book = {
  id: number;
  title: string;
  author: string;
};

const books = [
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
  const { id } = req.params;
  const bookIndex = books.findIndex((book: Book) => book.id === Number(id));

  if (bookIndex === -1) {
    return res.status(404).json({ message: 'Book not found' });
  }

  books.splice(bookIndex, 1);
  res.status(204).send();
});

const server = app.listen(3030, () => {
  console.log('Server is listening on port 3030');
});

export { app, server };
