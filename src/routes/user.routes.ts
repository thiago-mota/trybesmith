import { Router } from 'express';
import UserController from '../controllers/user.controller';
import { validateUsername, validatePassword, checkUser } from '../middlewares/loginValidation';

const router = Router();

const userController = new UserController();

router.post('/users', userController.create);
router.post('/login', validateUsername, validatePassword, checkUser, userController.login);

export default router;
