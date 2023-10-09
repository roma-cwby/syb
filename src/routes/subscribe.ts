import express from 'express';
import { ctrl } from 'controllers/subscribe';
import { authenticate } from 'middlewares/authenticate';

export const subscribeRouter = express.Router();

subscribeRouter.patch('/', authenticate, ctrl.subscribe);
