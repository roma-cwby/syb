import { Request, Response } from 'express';
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

const current = async (req: IRequest, res: Response) => {
  res.status(200).json({
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    avatar: req.user.avatar,
  });
};

const update = async (req: IRequest, res: Response) => {
  const response = await User.findByIdAndUpdate(
    req.params.id,
    { ...req.body },
    { new: true, select: 'name email avatar' }
  );

  res.status(200).json(response);
};

const changePassword = async (req: IRequest, res: Response) => {
  const hashPass = await bcrypt.hash(req.body.password, 10);

  await User.findByIdAndUpdate(req.params.id, { ...req.body, password: hashPass });

  res.status(200).json({ message: 'New password save' });
};

const changeAvatar = async (req: IRequest, res: Response) => {
  console.log(req.body);
};

export const ctrl = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  current: ctrlWrapper(current),
  update: ctrlWrapper(update),
  changePassword: ctrlWrapper(changePassword),
  changeAvatar: ctrlWrapper(changeAvatar),
};
