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
  it('should delete a book and return a success message', async () => {
    const bookId = 1;

    const deleteResponse = await request(app).delete(`/api/books/${bookId}`);
    expect(deleteResponse.status).toBe(200);
    expect(deleteResponse.body).toEqual({
      message: 'Book deleted successfully',
    });

    // Verify that the book has been deleted
    const getResponse = await request(app).get('/api/books');
    expect(getResponse.status).toBe(200);
    const bookIds = getResponse.body.map((book: Book) => book.id);
    expect(bookIds).not.toContain(bookId);
  });

  it('should return 404 for a non-existing book', async () => {
    const nonExistingBookId = 999;

    const deleteResponse = await request(app).delete(
      `/api/books/${nonExistingBookId}`,
    );
    expect(deleteResponse.status).toBe(404);
    expect(deleteResponse.body).toEqual({ message: 'Book not found' });
  });
});
