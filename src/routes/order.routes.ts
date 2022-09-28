import { Router } from 'express';
import OrderController from '../controllers/order.controller';
import { validateToken, validateProducts } from '../middlewares/orderValidation';

const router = Router();

const orderController = new OrderController();
router.get('/orders', orderController.getAll);
router.post('/orders', validateToken, validateProducts, orderController.create);

export default router;
