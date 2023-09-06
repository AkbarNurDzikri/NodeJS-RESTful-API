import express from 'express';
import userController from '../controllers/user-controller.js';
import contactController from '../controllers/contact-controller.js';
import { authMiddleware } from '../middleware/auth-middleware.js';

const userRouter = express.Router();

// user API
userRouter.use(authMiddleware);
userRouter.get('/api/users/current', userController.get);
userRouter.patch('/api/users/current', userController.update)
userRouter.delete('/api/users/logout', userController.logout);

// contact API
userRouter.post('/api/contacts', contactController.create);
userRouter.get('/api/contacts/:contactId', contactController.get);
userRouter.put('/api/contacts/:contactId', contactController.update);

export {userRouter};