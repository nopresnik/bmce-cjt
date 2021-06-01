import { Router } from 'express';
import clientRoutes from './client.route';
import jobRoutes from './job.route';
import userRoutes from './user.route';

const router = Router();

router.use('/users', userRoutes);

router.use('/clients', clientRoutes);

router.use('/jobs', jobRoutes);

export default router;
