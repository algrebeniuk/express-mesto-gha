import express from 'express';
import {
  getUsers, getUser, updateUser, updateUserAvatar, getCurrentUser,
} from '../controllers/user.js';

const userRouter = express.Router();

userRouter.get('/', getUsers);
userRouter.get('/:userId', getUser);
userRouter.get('/users/me', getCurrentUser);
userRouter.patch('/me', updateUser);
userRouter.patch('/me/avatar', updateUserAvatar);

export default userRouter;
