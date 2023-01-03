import express from 'express';
import {
  getUsers, getCurrentUser, createUser, updateUser, updateUserAvatar,
} from '../controllers/user.js';

const userRouter = express.Router();

userRouter.get('/', getUsers);
userRouter.get('/:userId', getCurrentUser);
userRouter.post('/', createUser);
userRouter.patch('/me', updateUser);
userRouter.patch('/me/avatar', updateUserAvatar);

export default userRouter;
