import createServer from 'server';
import request from 'supertest';
import { expect } from 'chai';

const app = createServer();

const testJob = {
  client: '60b62519a24f31f94d511ab4',
  location: {
    line1: '49 Test St',
  },
};

describe('Test /jobs routes', () => {
  it('POST /jobs empty success = false', async () => {
    const response = await request(app).post('/jobs');

    expect(response.body.success).to.be.false;
  });

  it('POST /jobs with job success = true', async () => {
    const response = await request(app).post('/jobs').send(testJob);

    expect(response.body.success).to.be.true;
    expect(response.body.data.location.line1).to.equal('49 Test St');
  });

  it('GET /jobs success = true', async () => {
    const response = await request(app).get('/jobs');

    expect(response.body.success).to.be.true;
  });
});
