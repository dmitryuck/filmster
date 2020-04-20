import { Request, Response, NextFunction } from 'express';
import ResponseObject from '../classes/ResponseObject';


export const cacheStore = {};

export const cacheMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { search, page } = req.query;

  const result = cacheStore[search + '-' + page];

  if (result) {
    ResponseObject.success(res, result);
  } else {
    next();
  }
}