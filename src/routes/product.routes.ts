import { Router } from 'express';
import ProductController from '../controllers/product.controllers';

const router = Router();

const productController = new ProductController();
router.get('/products', productController.getAll);

export default router;
