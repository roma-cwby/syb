import { Request, Response, NextFunction } from 'express';
import { User } from '../models/user';
import { httpError } from 'helpers/httpError';
import { ctrlWrapper } from 'helpers/ctrlWrapper';
import gravatar from 'gravatar';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import type { IRequest } from 'types';

const { TOKEN_KEY } = process.env;

const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) throw httpError(409, 'Email already in use');

  const hashPass = await bcrypt.hash(password, 10);

  let avatar = gravatar.url(email);
  avatar += '?d=identicon';

  const newUser = await User.create({ ...req.body, password: hashPass, avatar });

  const payload = {
    id: newUser._id,
  };
  const token = jwt.sign(payload, TOKEN_KEY, { expiresIn: '3d' });
  await User.findByIdAndUpdate(newUser._id, { token });

  res.status(200).json({
    user: {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      avatar,
    },
    token,
  });
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) throw httpError(401, 'Email or password invalid');

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) throw httpError(401, 'Email or password invalid');

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, TOKEN_KEY, { expiresIn: '3d' });
  await User.findByIdAndUpdate(user._id, { token });

  res.status(200).json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    },
    token,
  });
};

const logout = async (req: IRequest, res: Response) => {
  await User.findByIdAndUpdate(req.user._id, { token: '' });
  res.status(201).json({});
};

export const ctrl = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
};
