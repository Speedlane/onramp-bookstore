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
  afterAll(done => {
    server.close(done);
  });

  it('should delete a book that exists', async () => {
    const res = await request(app).delete('/api/books/1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: 'Book deleted successfully' });

    // Verify the book was actually deleted
    const getRes = await request(app).get('/api/books');
    expect(getRes.body).toHaveLength(2);
    expect((getRes.body as Book[]).find(book => book.id === 1)).toBeUndefined();
  });

  it('should return 404 when trying to delete a book that doesn\'t exist', async () => {
    const res = await request(app).delete('/api/books/999');
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ message: 'Book not found' });
  });

  it('should handle invalid id parameter', async () => {
    const res = await request(app).delete('/api/books/invalid');
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ message: 'Book not found' });
  });
});
