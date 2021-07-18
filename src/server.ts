import cors from 'cors';
import express, { Application } from 'express';
import path from 'path';
import routes from './routes';

function createServer(): Application {
  const app: Application = express();

  app.use(cors());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  if (process.env.NODE_ENV === 'production') {
    // app.use(express.static('client'));
    app.use(express.static(path.join(__dirname, './client')));
  }

  app.use(routes);

  return app;
}

export default createServer;
