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
  it('should delete a book if found', async () => {
    const response = await request(app).delete(`/api/books/1`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Book deleted successfully');

    const newBooksList = await request(app).get('/api/books');
    expect(newBooksList.status).toBe(200);
    expect(newBooksList.body.find((book: Book) => book.id===1)).toBe(undefined);
  });

  it('should return 404 response if book not found', async () => {
    const response = await request(app).delete(`/api/books/0`);
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Book not found');
  })
});
