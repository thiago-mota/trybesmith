import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import OrderService from '../services/order.service';

class OrderController {
  constructor(private orderService = new OrderService()) { }

  public getAll = async (_request: Request, response: Response) => {
    const Orders = await this.orderService.getAll();

    response
      .status(StatusCodes.OK)
      .json(Orders);
  };

  public create = async (request: Request, response: Response) => {
    const { productsIds } = request.body;
    const { authorization } = request.headers;
    
    const tokenData = jwt.verify(authorization as string, 'secret') as jwt.JwtPayload;
    console.log('LOG DO JWT VERIFY ---->', tokenData.result[0].id);

    const newOrder = await this.orderService.create(productsIds, tokenData.result[0].id);

    return response.status(StatusCodes.CREATED).json(newOrder);
  };
}

export default OrderController;
