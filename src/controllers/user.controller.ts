import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import UserService from '../services/user.service';

class UserController {
  constructor(private userService = new UserService()) { }

  public create = async (request: Request, response: Response) => {
    const user = request.body;
    const token = await this.userService.create(user);

    response
      .status(StatusCodes.CREATED)
      .json({ token });
  };

  public login = async (request: Request, response: Response) => {
    const { username } = request.body;
    const token = await this.userService.login(username);

    response
      .status(StatusCodes.OK)
      .json({ token });
  };
}

export default UserController;
