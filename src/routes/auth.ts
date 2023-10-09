import express from 'express';
import { ctrl } from '../controllers/auth';
import { validateBody } from 'helpers/validateSchemas';
import { registerSchema, loginSchema, updateSchema, changePasswordSchema } from 'models/user';
import { authenticate } from 'middlewares/authenticate';
import { isValidId } from 'middlewares/isValidId';
import { avatarImage } from 'middlewares/uploadImage';

export const userRouter = express.Router();

userRouter.post('/register', validateBody(registerSchema), ctrl.register);

userRouter.post('/login', validateBody(loginSchema), ctrl.login);

userRouter.post('/logout', authenticate, ctrl.logout);

userRouter.get('/current', authenticate, ctrl.current);

userRouter.put('/:id', isValidId, authenticate, validateBody(updateSchema), ctrl.update);

userRouter.patch(
  '/:id/password',
  isValidId,
  authenticate,
  validateBody(changePasswordSchema),
  ctrl.changePassword
);

userRouter.patch(
  '/:id/avatar',
  isValidId,
  authenticate,
  avatarImage.single('avatar'),
  ctrl.changeAvatar
);
