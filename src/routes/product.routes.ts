import { Router } from 'express';
import ProductController from '../controllers/product.controllers';
import { validateName, validateAmount } from '../middlewares/productValidation';

const router = Router();

const productController = new ProductController();
router.get('/products', productController.getAll);
router.post('/products', validateName, validateAmount, productController.create);

export default router;
