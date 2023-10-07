import { Request, Response, NextFunction } from 'express';
import { httpError } from './httpError';

export const validateBody = schema => async (req: Request, res: Response, next: NextFunction) => {
  const { error } = schema.validate(req.body);
  if (error) next(httpError(400, error.message));
  next();
};
