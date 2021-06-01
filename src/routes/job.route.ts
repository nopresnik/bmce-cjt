import { Router } from 'express';
import controller from '../controllers/job.controller';

const router = Router();

router.get('/', controller.getAllJobs);

router.post('/', controller.createJob);

export default router;
