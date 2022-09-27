import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import connection from '../models/connection';
import UserModel from '../models/user.model';

const userModel = new UserModel(connection);

export const validateUsername = (request: Request, response: Response, next: NextFunction) => {
  const { username } = request.body;

  if (!username) {
    return response
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: '"username" is required' });
  }

  next();
};

export const validatePassword = (request: Request, response: Response, next: NextFunction) => {
  const { password } = request.body;

  if (!password) { 
    return response
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: '"password" is required' });
  }
  next();
};

export const checkUser = async (request: Request, response: Response, next: NextFunction) => {
  const { username, password } = request.body;
  const userLogin = await userModel.login(username);

  if (userLogin.length === 0 || password !== userLogin[0].password) {
    return response
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'Username or password invalid' });
  }
  next();
};
