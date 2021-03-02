import { Router } from 'express';
import { UserController } from './controllers/UserControllers';
const router = Router();
const userControllers = new UserController();
router.post('/users', userControllers.create);

export { router };
