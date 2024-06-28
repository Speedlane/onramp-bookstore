import request from 'supertest';
import { app, server } from '../server';

type Book = {
  id: number;
  title: string;
  author: string;
};

describe('Get /api/books', () => {
  afterAll((done) => {
    server.close(done);
  });

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
