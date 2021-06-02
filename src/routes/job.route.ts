import { Router } from 'express';
import controller from '../controllers/job.controller';

const router = Router();

router.post('/', controller.createJob);

router.get('/', controller.getAllJobs);

router.get('/:jobID', controller.getJobById);

router.patch('/:jobID', controller.patchJob);

export default router;
