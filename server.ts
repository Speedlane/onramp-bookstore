import express from 'express';

const app = express();

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

const server = app.listen(3030, () => {
  console.log('Server is listening on port 3030');
});

export { app, server };
