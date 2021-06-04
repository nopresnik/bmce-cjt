import { Router } from 'express';
import clientRoutes from './client.route';
import jobRoutes from './job.route';
import userRoutes from './user.route';
import path from 'path';

const router = Router();

router.use('/api/users', userRoutes);

router.use('/api/clients', clientRoutes);

router.use('/api/jobs', jobRoutes);

if (process.env.NODE_ENV === 'production') {
  router.get('*', (req, res) => {
    const file = path.join(__dirname, '../client/index.html');
    res.sendFile(file);
  });
}

router.get('/', (req, res) => res.status(200).end());

export default router;
