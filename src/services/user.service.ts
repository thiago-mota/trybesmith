import jwt from 'jsonwebtoken';
import connection from '../models/connection';
import UserModel from '../models/user.model';
import User from '../interfaces/user.interface';

class UserService {
  public model: UserModel;

  constructor() {
    this.model = new UserModel(connection);
  }

  public async create(user: User): Promise<any> {
    const newUser = await this.model.create(user);
    const token = jwt.sign({ newUser }, 'secret');

    return token;
  }

  public async login(username: string): Promise<any> {
    const result = await this.model.login(username);
    const token = jwt.sign({ result }, 'secret');

    return token;
  }
}

export default UserService;
