import { NextFunction, Response } from 'express';
import { User } from '../models/user';
import { httpError } from 'helpers/httpError';
import { ctrlWrapper } from 'helpers/ctrlWrapper';
import type { IRequest } from 'types';
import { sendEmail } from 'helpers/sendEmail';

const subscribe = async (req: IRequest, res: Response, next: NextFunction) => {
  const { email } = req.user;

  if (req.user.subscribe) throw httpError(400, 'You subscribed already');

  // const vereifyEmail = {
  //   to: email,
  //   html: `<p>You subscribe on So Yummy</p>`,
  // };

  // await sendEmail(vereifyEmail);

  await User.findOneAndUpdate(req.user._id, { subscribe: true });

  res.status(200).json({
    message: 'Subscribed',
  });
};

export const ctrl = {
  subscribe: ctrlWrapper(subscribe),
};
