import { Request } from 'express';

export interface iUser {
  name: string;
  email: string;
  password: string;
  token: string;
  avatar: string;
}

export interface IError extends Error {
  status?: number;
}

export interface IRequest extends Request {
  user?: any;
}
