import { Router } from 'express';
import controller from '../controllers/client.controller';

const router = Router();

router.post('/', controller.createClient);

router.get('/', controller.getAllClients);

router.patch('/:clientID', controller.patchClient);

router.delete('/:clientID', controller.deleteClient);

export default router;
