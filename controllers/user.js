import User from '../models/user.js';

export function getUsers(req, res) {
  User.find({})
    .then((user) => res.send(user))
    .catch(() => res.status(500).send({ message: 'Пользователи не найдены' }));
}

export function getCurrentUser(req, res) {
  const { userId } = req.params;
  User.findById(userId)
    .orFail(new Error('NotValidId'))
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.message === 'NotValidId') {
        res.status(404).send({ message: 'Пользователь не найден' });
      }
      if (err.name === 'CastError') {
        res.status(400).send({ message: err.message });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
}

export function createUser(req, res) {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err) {
        res.status(400).send({ message: 'Введены некорректные данные' });
      }
      if (err) {
        res.status(500).send({ message: err.message });
      }
    });
}

export function updateUser(req, res) {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.message === 'NotFound') {
        res.status(404).send({ message: 'Пользователь не найден' });
      }
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Введены некорректные данные' });
      }
      if (err) {
        res.status(500).send({ message: err.message });
      }
    });
}

export function updateUserAvatar(req, res) {
  const { avatar } = req.body;
  const owner = req.user._id;

  User.findByIdAndUpdate(owner, { avatar }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.message === 'NotFound') {
        res.status(404).send({ message: 'Пользователь не найден' });
      }
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Введены некорректные данные' });
      }
      if (err) {
        res.status(500).send({ message: err.message });
      }
    });
}
