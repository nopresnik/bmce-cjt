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
    expect(response.body.data.location).to.deep.equal(testJob.location);
  });

  it('GET /jobs success = true', async () => {
    const response = await request(app).get('/jobs');

    expect(response.body.success).to.be.true;
  });

  it('GET /jobs/1 success = true', async () => {
    const response = await request(app).get('/jobs/1');

    expect(response.body.success).to.be.true;
    expect(response.body.data.location).to.deep.equal(testJob.location);
  });

  it('PATCH /jobs/1 success = true', async () => {
    const newLoc = {
      location: {
        line1: '21 Test St',
      },
    };
    const response = await request(app).patch('/jobs/1').send(newLoc);

    expect(response.body.success).to.be.true;
    expect(response.body.data.location).to.deep.equal(newLoc.location);
  });

  it('DELETE /jobs/1 success = true', async () => {
    const response = await request(app).delete('/jobs/1');

    expect(response.body.success).to.be.true;
    expect(response.body.data.deleted).to.be.true;
  });
});
