import { Router } from 'express';
import UserController from '../controllers/user.controller';
import { validateUsername, validatePassword, checkUser } from '../middlewares/loginValidation';
import { validateUserName, validateClasse,
  validateLevel, validateUserPassword } from '../middlewares/userValidation';

const router = Router();

const userController = new UserController();

router.post(
  '/users',
  validateUserName,
  validateClasse,
  validateLevel,
  validateUserPassword,
  userController.create,
);
router.post('/login', validateUsername, validatePassword, checkUser, userController.login);

export default router;
