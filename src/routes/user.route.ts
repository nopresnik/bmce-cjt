import { Router } from 'express';
import controller from '../controllers/user.controller';

const router = Router();

router.get('/', controller.getAllUsers);

router.post('/', controller.createUser);

export default router;
