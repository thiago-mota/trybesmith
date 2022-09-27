import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const validateName = (request: Request, response: Response, next: NextFunction) => {
  const { name } = request.body;

  if (!name) {
    return response
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: '"name" is required' });
  }
  if (typeof name !== 'string') {
    return response
      .status(StatusCodes.UNPROCESSABLE_ENTITY)
      .json({ message: '"name" must be a string' });
  }
  if (name.length < 3) {
    return response
      .status(StatusCodes.UNPROCESSABLE_ENTITY)
      .json({ message: '"name" length must be at least 3 characters long' });
  }
  next();
};

export const validateAmount = (request: Request, response: Response, next: NextFunction) => {
  const { amount } = request.body;

  if (!amount) {
    return response
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: '"amount" is required' });
  }
  if (typeof amount !== 'string') {
    return response
      .status(StatusCodes.UNPROCESSABLE_ENTITY)
      .json({ message: '"amount" must be a string' });
  }
  if (amount.length < 3) {
    return response
      .status(StatusCodes.UNPROCESSABLE_ENTITY)
      .json({ message: '"amount" length must be at least 3 characters long' });
  }
  next();
};