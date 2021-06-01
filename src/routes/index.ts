import { Router } from 'express';
import clientRoutes from './client.route';
import userRoutes from './user.route';

const router = Router();

router.use('/users', userRoutes);

router.use('/clients', clientRoutes);

export default router;
