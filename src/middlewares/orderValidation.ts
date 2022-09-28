import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';

export const validateProducts = (request: Request, response: Response, next: NextFunction) => {
  const { prodcutsIds } = request.body;
  if (!prodcutsIds) {
    return response
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: '"prodcutsIds" is required' });
  }
  if (!Array.isArray(prodcutsIds)) {
    return response
      .status(StatusCodes.UNPROCESSABLE_ENTITY)
      .json({ message: '"prodcutsIds" must be a string' });
    // https://betterprogramming.pub/how-to-check-data-types-in-javascript-using-typeof-424d0520a329#:~:text=One%20type%20of%20object%20that,tell%20arrays%20from%20other%20objects.
  }
  if (prodcutsIds.length === 0) {
    return response
      .status(StatusCodes.UNPROCESSABLE_ENTITY)
      .json({ message: '"prodcutsIds" length must be at least 3 characters long' });
  }
  next();
};

// const decodeToken = (authorization: any) => {
//   const verifiedToken = jwt.verify(authorization, 'secret');
//   return verifiedToken;
// };

export const validateToken = (request: Request, response: Response, next: NextFunction) => {
  const { authorization } = request.headers;

  try {
    if (!authorization) {
      return response
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'Token not found' });
    }
    next();
    // const token = decodeToken(authorization);
    jwt.verify(authorization, 'secret');
  } catch (error) {
    return response
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'Invalid token' });
  }
};
