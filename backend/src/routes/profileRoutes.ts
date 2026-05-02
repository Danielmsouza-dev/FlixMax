import { Router } from 'express';
import { ProfileController } from '../controllers/profileController';

const router = Router();
const controller = new ProfileController();

router.get('/', controller.getAll.bind(controller));
router.post('/', controller.create.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;