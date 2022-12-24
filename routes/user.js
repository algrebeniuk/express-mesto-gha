const userRouter = require('express').Router();
const {
  getUsers, getCurrentUser, createUser, updateUser, updateUserAvatar,
} = require('../controllers/user');

userRouter.get('/users', getUsers);
userRouter.get('/users/:userId', getCurrentUser);
userRouter.post('/users', createUser);
userRouter.patch('/users/me', updateUser);
userRouter.patch('/users/me/avatar', updateUserAvatar);

module.exports = userRouter;
