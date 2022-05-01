import cors from 'cors';
import express, { Application } from 'express';
import path from 'path';
import { container } from 'tsyringe';
import { ClientController } from './controllers/client.controller';
import { JobController } from './controllers/job.controller';
import { PriceCategoryController } from './controllers/pricecategory.controller';
import { RegisterController } from './controllers/registerentry.controller';
import { SearchController } from './controllers/search.controller';
import { StatsController } from './controllers/stats.controller';
import { UserController } from './controllers/user.controller';

function createServer(): Application {
  const app: Application = express();

  app.use(cors());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, './client')));
  }

  app.use('/api/clients', container.resolve(ClientController).routes());
  app.use('/api/jobs', container.resolve(JobController).routes());
  app.use('/api/pricecategories', container.resolve(PriceCategoryController).routes());
  app.use('/api/registers/:registerName', container.resolve(RegisterController).routes());
  app.use('/api/users', container.resolve(UserController).routes());
  app.use('/api/stats', container.resolve(StatsController).routes());
  app.use('/api/search', container.resolve(SearchController).routes());

  return app;
}

export default createServer;
