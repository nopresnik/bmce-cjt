import express, { Application } from 'express';
import routes from './routes';

function createServer(): Application {
  const app: Application = express();

  app.use(express.json());

  app.use(routes);

  app.get('/', (req, res) => res.send('Hello world'));

  return app;
}

export default createServer;
