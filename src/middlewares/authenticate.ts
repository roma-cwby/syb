import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';
import { httpError } from 'helpers/httpError';
import type { IRequest } from 'types';

const { TOKEN_KEY } = process.env;

export const authenticate = async (req: IRequest, res: Response, next: NextFunction) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');

  if (bearer !== 'Bearer') next(httpError(401));

  try {
    const { id } = jwt.verify(token, TOKEN_KEY);
    const user = await User.findById(id);

    if (!user || !user.token || user.token !== token) next(httpError(401));
    req.user = user;
    next();
  } catch {
    next(httpError(401));
  }
};
