import { Router } from 'express';
import path from 'path';
import clientRoutes from './client.route';
import jobRoutes from './job.route';
import priceCategoriesRoutes from './pricecategory.route';
import statsRoutes from './stats.route';
import userRoutes from './user.route';
import searchRoutes from './search.route';

const router = Router();

router.use('/api/users', userRoutes);

router.use('/api/clients', clientRoutes);

router.use('/api/jobs', jobRoutes);

router.use('/api/stats', statsRoutes);

router.use('/api/pricecategories', priceCategoriesRoutes);

router.use('/api/search', searchRoutes);

if (process.env.NODE_ENV === 'production') {
  router.get('*', (req, res) => {
    const file = path.join(__dirname, '../client/index.html');
    res.sendFile(file);
  });
}

router.get('/', (req, res) => res.status(200).end());

export default router;
