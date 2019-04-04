import * as express from 'express';
import { HttpError } from '../Errors';
export const errorHandler = ((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  
    if (err) {
      if (err instanceof HttpError) {
        res.status(err.statusCode).json({
          status: err.statusCode,
          message: err.message,
        });
        next(err)        
      } else {
        res.status(500).json({
          status: 500,
          message: 'An unexpected error occurred!',
        });
        next(err) 
      }
    } else {
      next();
    }
  });