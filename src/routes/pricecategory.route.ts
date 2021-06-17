import { Router } from 'express';
import controller from '../controllers/pricecategory.controller';

const router = Router();

router.post('/', controller.createCategory);

router.get('/', controller.getCategories);

export default router;
