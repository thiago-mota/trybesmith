import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';

export const validateProducts = (request: Request, response: Response, next: NextFunction) => {
  const { productsIds } = request.body;
  if (!productsIds) {
    return response
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: '"productsIds" is required' });
  }
  if (!Array.isArray(productsIds)) {
    return response
      .status(StatusCodes.UNPROCESSABLE_ENTITY)
      .json({ message: '"productsIds" must be an array' });
    // https://betterprogramming.pub/how-to-check-data-types-in-javascript-using-typeof-424d0520a329#:~:text=One%20type%20of%20object%20that,tell%20arrays%20from%20other%20objects.
  }
  if (productsIds.length === 0) {
    return response
      .status(StatusCodes.UNPROCESSABLE_ENTITY)
      .json({ message: '"productsIds" must include only numbers' });
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
    if (authorization === undefined) {
      return response
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: 'Token not found' });
    }
    // const token = decodeToken(authorization);
    jwt.verify(authorization, 'secret');
  } catch (error) {
    return response
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'Invalid token' });
  }
  next();
};
