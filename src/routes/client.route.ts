import { Router } from 'express';
import controller from '../controllers/client.controller';

const router = Router();

router.get('/', controller.getAllClients);

router.post('/', controller.createClient);

export default router;
