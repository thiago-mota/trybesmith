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

  public create = async (request: Request, response: Response) => {
    const product = request.body;
    const productCreated = await this.productService.create(product);

    response
      .status(StatusCodes.CREATED)
      .json(productCreated);
  };
}

export default ProductController;
