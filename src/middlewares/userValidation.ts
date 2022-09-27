import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const validateUserName = (request: Request, response: Response, next: NextFunction) => {
  const { username } = request.body;

  if (!username) {
    return response
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: '"username" is required' });
  }
  if (typeof username !== 'string') {
    return response
      .status(StatusCodes.UNPROCESSABLE_ENTITY)
      .json({ message: '"username" must be a string' });
  }
  if (username.length < 3) {
    return response
      .status(StatusCodes.UNPROCESSABLE_ENTITY)
      .json({ message: '"username" length must be at least 3 characters long' });
  }
  next();
};

export const validateClasse = (request: Request, response: Response, next: NextFunction) => {
  const { classe } = request.body;
  if (!classe) {
    return response
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: '"classe" is required' });
  }
  if (typeof classe !== 'string') {
    return response
      .status(StatusCodes.UNPROCESSABLE_ENTITY)
      .json({ message: '"classe" must be a string' });
  }
  if (classe.length < 3) {
    return response
      .status(StatusCodes.UNPROCESSABLE_ENTITY)
      .json({ message: '"classe" length must be at least 3 characters long' });
  }
  next();
};

export const validateLevel = (request: Request, response: Response, next: NextFunction) => {
  const { level } = request.body;
  if (level === undefined) {
    return response
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: '"level" is required' });
  }
  if (typeof level !== 'number') {
    return response
      .status(StatusCodes.UNPROCESSABLE_ENTITY)
      .json({ message: '"level" must be a number' });
  }
  if (level < 1) {
    return response
      .status(StatusCodes.UNPROCESSABLE_ENTITY)
      .json({ message: '"level" must be greater than or equal to 1' });
  }
  next();
};

export const validateUserPassword = (request: Request, response: Response, next: NextFunction) => {
  const { password } = request.body;
  if (!password) {
    return response
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: '"password" is required' });
  }
  if (typeof password !== 'string') {
    return response
      .status(StatusCodes.UNPROCESSABLE_ENTITY)
      .json({ message: '"password" must be a string' });
  }
  if (password.length < 8) {
    return response
      .status(StatusCodes.UNPROCESSABLE_ENTITY)
      .json({ message: '"password" length must be at least 8 characters long' });
  }
  next();
};