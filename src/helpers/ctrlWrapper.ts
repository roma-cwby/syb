import { Request, Response, NextFunction } from 'express';

export const ctrlWrapper = ctrl => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await ctrl(req, res, next);
  } catch (error) {
    next(error);
  }
};
