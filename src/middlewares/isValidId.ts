import { Request, Response, NextFunction, RequestParamHandler } from 'express';
import { isValidObjectId } from 'mongoose';
import { httpError } from 'helpers/httpError';

export const isValidId = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) next(httpError(400, `${id} is not valid id`));
  next();
};
