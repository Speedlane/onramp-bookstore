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

describe('DELETE /api/books/:id', () => {
  it('should delete a book that exists', async () => {
    const response = await request(app).delete('/api/books/1');
    expect(response.status).toBe(204);
  });

  it('should return 404 for a book that does not exist', async () => {
    const response = await request(app).delete('/api/books/99');
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Book not found');
  });

  it('should remove the book from the list', async () => {
    const response = await request(app).delete('/api/books/2');
    expect(response.status).toBe(204);

    const getResponse = await request(app).get('/api/books');
    expect(getResponse.body.length).toBe(1);
    expect(
      getResponse.body.find((book: Book) => book.id === 2),
    ).toBeUndefined();
  });
});
