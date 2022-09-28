import { Pool, ResultSetHeader } from 'mysql2/promise';
import Order from '../interfaces/order.interface';

export default class OrderModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<Order[]> {
    const [result] = await this.connection
      .execute(`
      SELECT 
      orders.id, orders.userId, JSON_ARRAYAGG(product.id) AS productsIds
  FROM
      Trybesmith.Orders AS orders
          INNER JOIN
      Trybesmith.Products AS product ON orders.id = product.orderId
      GROUP BY orders.id
      ORDER BY orders.userId
      `);
    // https://dev.mysql.com/doc/refman/5.7/en/aggregate-functions.html#function_json-arrayagg
    return result as Order[];
  }

  public async create(order: number[], id: number): Promise<Order> {
    const [result] = await this.connection
      .execute<ResultSetHeader>('INSERT INTO Trybesmith.Orders(userId) VALUES (?)', [id]);
    const { insertId } = result;

    order.forEach(async (productId) => {
      await this.connection.execute(
        'UPDATE Trybesmith.Products SET orderId = ? WHERE id =?',
        [insertId, productId],
      );
    });

    return { userId: id, productsIds: order } as Order;
  }
}