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

describe('Test /api/jobs routes', () => {
  it('POST /api/jobs empty success = false', async () => {
    const response = await request(app).post('/api/jobs');

    expect(response.body.success).to.be.false;
  });

  it('POST /api/jobs with job success = true', async () => {
    const response = await request(app).post('/api/jobs').send(testJob);

    expect(response.body.success).to.be.true;
    expect(response.body.data.location).to.deep.equal(testJob.location);
  });

  it('GET /api/jobs success = true', async () => {
    const response = await request(app).get('/api/jobs');

    expect(response.body.success).to.be.true;
  });

  it('GET /api/jobs/1 success = true', async () => {
    const response = await request(app).get('/api/jobs/1');

    expect(response.body.success).to.be.true;
    expect(response.body.data.location).to.deep.equal(testJob.location);
  });

  it('PATCH /api/jobs/1 success = true', async () => {
    const newLoc = {
      location: {
        line1: '21 Test St',
      },
    };
    const response = await request(app).patch('/api/jobs/1').send(newLoc);

    expect(response.body.success).to.be.true;
    expect(response.body.data.location).to.deep.equal(newLoc.location);
  });

  it('DELETE /api/jobs/1 success = true', async () => {
    const response = await request(app).delete('/api/jobs/1');

    expect(response.body.success).to.be.true;
    expect(response.body.data.deleted).to.be.true;
  });
});
