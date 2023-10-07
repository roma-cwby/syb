import { Request, Response, NextFunction } from 'express';
import { User } from '../models/user';
import { httpError } from 'helpers/httpError';
import { ctrlWrapper } from 'helpers/ctrlWrapper';
import gravatar from 'gravatar';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const { TOKEN_KEY } = process.env;

const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) throw httpError(409, 'Email already in use');

  const hashPass = await bcrypt.hash(password, 10);

  let avatar = gravatar.url(email);
  avatar += '?d=identicon';

  const newUser = await User.create({ ...req.body, password: hashPass, avatar });

  res.status(200).json({ newUser });
};

export const ctrl = {
  register: ctrlWrapper(register),
};
