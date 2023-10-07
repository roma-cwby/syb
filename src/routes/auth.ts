import express from 'express';
import { ctrl } from '../controllers/auth';
import { validateBody } from 'helpers/validateSchemas';
import { registerSchema } from 'models/user';

export const userRouter = express.Router();

userRouter.post('/', validateBody(registerSchema), ctrl.register);
