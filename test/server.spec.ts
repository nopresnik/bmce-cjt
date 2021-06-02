import createServer from 'server';
import request from 'supertest';

const app = createServer();

describe('Server checks', () => {
  it('Server is created without error', (done) => {
    request(app).get('/').expect(200, done);
  });
});
