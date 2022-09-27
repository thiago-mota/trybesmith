import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import OrderService from '../services/order.service';

class OrderController {
  constructor(private orderService = new OrderService()) { }

  public getAll = async (_request: Request, response: Response) => {
    const Orders = await this.orderService.getAll();

    response
      .status(StatusCodes.OK)
      .json(Orders);
  };
}

export default OrderController;
