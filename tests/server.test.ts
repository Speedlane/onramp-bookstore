import request from 'supertest';
import { app, server } from '../server';

type Book = {
  id: number;
  title: string;
  author: string;
};

afterAll((done) => {
  server.close(done);
});

describe('Get /api/books', () => {
  it('should return a list of books', async () => {
    const response = await request(app).get('/api/books');
    expect(response.status).toBe(200);
    response.body.forEach((book: Book) => {
      expect(book).toHaveProperty('id');
      expect(book).toHaveProperty('title');
      expect(book).toHaveProperty('author');
    });
  });
});

describe('Delete /api/books/:id', () => {
  it('should delete a book', async () => {
    const response = await request(app).delete('/api/books/1');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Book deleted' });
  });

  it('should return 404 if book not found', async () => {
    const response = await request(app).delete('/api/books/1');
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: 'Book not found' });
  });
});
