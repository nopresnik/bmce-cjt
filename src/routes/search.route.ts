import { Router } from 'express';
import controller from '../controllers/search.controller';

const router = Router();

router.get('/', controller.searchJobs);

export default router;
