import createServer from 'server';
import request from 'supertest';
import { expect } from 'chai';

const app = createServer();

const testClient = {
  name: 'Test Client',
  email: 'test@test.com',
};

let clientID: string;

describe('Test /clients routes', () => {
  it('POST /clients empty success = false', async () => {
    const { body } = await request(app).post('/clients');

    expect(body.success).to.be.false;
  });

  it('POST /clients with client = true', async () => {
    const { body } = await request(app).post('/clients').send(testClient);

    // Store client ID
    clientID = body.data._id;

    expect(body.success).to.be.true;
    expect(body.data.name).to.equal(testClient.name);
    expect(body.data.email).to.equal(testClient.email);
  });

  it('GET /clients success = true ', async () => {
    const { body } = await request(app).get('/clients');

    expect(body.success).to.be.true;
  });

  it(`GET /clients/id success = true`, async () => {
    const { body } = await request(app).get(`/clients/${clientID}`);

    expect(body.success).to.be.true;
    expect(body.data.name).to.equal(testClient.name);
  });

  it('PATCH /clients/id success = true', async () => {
    const newData = {
      name: 'Updated Client Name',
    };

    const { body } = await request(app).patch(`/clients/${clientID}`).send(newData);

    expect(body.success).to.be.true;
    expect(body.data.name).to.equal(newData.name);
  });

  it('DELETE /cleints/id success = true', async () => {
    const { body } = await request(app).delete(`/clients/${clientID}`);

    expect(body.success).to.be.true;
    expect(body.data.deleted).to.be.true;
  });
});
