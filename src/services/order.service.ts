import connection from '../models/connection';
import OrderModel from '../models/order.model';
import Order from '../interfaces/order.interface';

class OrderService {
  public model: OrderModel;

  constructor() {
    this.model = new OrderModel(connection);
  }

  public async getAll(): Promise<Order[]> {
    const result = await this.model.getAll();
    return result;
  }

  public async create(order: number[], id: number): Promise<Order> {
    const result = await this.model.create(order, id);
    return result;
  }
}

export default OrderService;
