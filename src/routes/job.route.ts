import { Router } from 'express';
import controller from '../controllers/job.controller';

const router = Router();

router.post('/', controller.createJob);

router.get('/', controller.getAllJobs);

router.get('/:jobID', controller.getJobById);

export default router;
