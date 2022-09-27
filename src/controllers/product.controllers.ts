import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import ProductService from '../services/product.service';

class ProductController {
  constructor(private productService = new ProductService()) { }

  public getAll = async (_request: Request, response: Response) => {
    const products = await this.productService.getAll();

    response
      .status(StatusCodes.OK)
      .json(products);
  };
}

export default ProductController;
