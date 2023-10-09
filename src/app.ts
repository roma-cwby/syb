import { Request, Response, NextFunction } from 'express';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import type { IError } from './types';
import { userRouter } from 'routes/auth';
import { subscribeRouter } from 'routes/subscribe';

export const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/user', userRouter);

app.use('/api/subscribe', subscribeRouter);

app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err: IError, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status ? err.status : 500).json({ message: err.message });
});
