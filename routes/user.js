// eslint-disable-next-line no-undef
const userRouter = require('express').Router();
import { getUsers, getCurrentUser, createUser, updateUser, updateUserAvatar } from '../controllers/user';

userRouter.get('/', getUsers);
userRouter.get('/:userId', getCurrentUser);
userRouter.post('/', createUser);
userRouter.patch('/me', updateUser);
userRouter.patch('/me/avatar', updateUserAvatar);

export default userRouter;
