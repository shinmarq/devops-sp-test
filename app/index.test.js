const request = require('supertest');
const app = require('./index'); // Assuming your Express app is exported from index.js

describe('GET /api/mirror', () => {
  it('responds with JSON containing the transformed word', async () => {
    const wordToMirror = 'Test';
    const expectedTransformed = 'TSEt'; // Expected result for the given word

    const response = await request(app).get('/api/mirror').query({ word: wordToMirror });
    
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('transformed');
    expect(response.body.transformed).toEqual(expectedTransformed);
  });
});