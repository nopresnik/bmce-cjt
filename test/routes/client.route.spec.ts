import createServer from 'server';
import request from 'supertest';
import { expect } from 'chai';

const app = createServer();

const testClient = {
  name: 'Test Client',
  email: 'test@test.com',
};

let clientID: string;

describe('Test /api/clients routes', () => {
  it('POST /api/clients empty success = false', async () => {
    const { body } = await request(app).post('/api/clients');

    expect(body.success).to.be.false;
  });

  it('POST /api/clients with client = true', async () => {
    const { body } = await request(app).post('/api/clients').send(testClient);

    // Store client ID
    clientID = body.data._id;

    expect(body.success).to.be.true;
    expect(body.data.name).to.equal(testClient.name);
    expect(body.data.email).to.equal(testClient.email);
  });

  it('GET /api/clients success = true ', async () => {
    const { body } = await request(app).get('/api/clients');

    expect(body.success).to.be.true;
  });

  it(`GET /api/clients/id success = true`, async () => {
    const { body } = await request(app).get(`/api/clients/${clientID}`);

    expect(body.success).to.be.true;
    expect(body.data.name).to.equal(testClient.name);
  });

  it('PATCH /api/clients/id success = true', async () => {
    const newData = {
      name: 'Updated Client Name',
    };

    const { body } = await request(app).patch(`/api/clients/${clientID}`).send(newData);

    expect(body.success).to.be.true;
    expect(body.data.name).to.equal(newData.name);
  });

  it('DELETE /cleints/id success = true', async () => {
    const { body } = await request(app).delete(`/api/clients/${clientID}`);

    expect(body.success).to.be.true;
    expect(body.data.deleted).to.be.true;
  });
});
