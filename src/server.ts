import express, { Application } from 'express';

function createServer(): Application {
  const app: Application = express();

  app.use(express.json());

  app.get('/', (req, res) => res.send('Hello world'));

  return app;
}

export default createServer;
