import bcrypt from 'bcrypt';
import User from '../models/user.js';
import UnauthorizedError from '../errors/unauthorized-error.js';
import BadRequest from '../errors/bad-request.js';
import ConflictingRequest from '../errors/conflicting-request.js';
import NotFoundError from '../errors/not-found-error.js';

export function getUsers(req, res, next) {
  User.find({})
    .then((user) => res.send(user))
    .catch(next);
}

export function getUser(req, res, next) {
  const { userId } = req.params;
  User.findById(userId)
    .orFail(new NotFoundError('Пользователь не найден'))
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw next(new BadRequest(err.message));
      }
      next(err);
    });
}

export function createUser(req, res, next) {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.status(201).send({
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      email: user.email,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw next(new BadRequest('Введены некорректные данные'));
      } else if (err.code === 11000) {
        throw next(new ConflictingRequest('Пользователь с такой почтой уже существует'));
      } else {
        next(err);
      }
    });
}

export function login(req, res, next) {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw Promise.reject(new UnauthorizedError('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password);
    })
    .then((matched) => {
      if (!matched) {
        throw Promise.reject(new UnauthorizedError('Неправильные почта или пароль'));
      }
      res.send({ message: 'Всё верно!' });
    })
    .catch(() => {
      throw next(new UnauthorizedError('Неправильные почта или пароль'));
    });
}

export function updateUser(req, res, next) {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.message === 'NotFound') {
        throw next(new NotFoundError('Пользователь не найден'));
      }
      if (err.name === 'ValidationError') {
        throw next(new BadRequest('Введены некорректные данные'));
      }
      if (err) {
        next(err);
      }
    });
}

export function updateUserAvatar(req, res, next) {
  const { avatar } = req.body;
  const owner = req.user._id;

  User.findByIdAndUpdate(owner, { avatar }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.message === 'NotFound') {
        throw next(new NotFoundError('Пользователь не найден'));
      }
      if (err.name === 'ValidationError') {
        throw next(new BadRequest('Введены некорректные данные'));
      }
      if (err) {
        next(err);
      }
    });
}

export function getCurrentUser(req, res, next) {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw next(new NotFoundError('Пользователь не найден'));
      }
    })
    .catch(next);
}
