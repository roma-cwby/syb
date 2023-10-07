import express from 'express';
import { ctrl } from '../controllers/auth';
import { validateBody } from 'helpers/validateSchemas';
import { registerSchema, loginSchema } from 'models/user';
import { authenticate } from 'middlewares/authenticate';

export const userRouter = express.Router();

userRouter.post('/register', validateBody(registerSchema), ctrl.register);

userRouter.post('/login', validateBody(loginSchema), ctrl.login);

userRouter.post('/logout', authenticate, ctrl.logout);
