import { Router } from 'express';
import controller from '../controllers/stats.controller';

const router = Router();

router.get('/', controller.getStats);

export default router;
