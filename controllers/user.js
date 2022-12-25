const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((user) => res.send(user))
    .catch(() => res.status(500).send({ message: 'Пользователи не найдены' }));
};

module.exports.getCurrentUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => res.send(user))
    .catch((err) => {
      if (err) {
        res.status(400).send({ message: err.message });
      }
      if (err) {
        res.status(404).send({ message: 'Запрашиваемый пользователь не найден' });
      }
    });
};

module.exports.createUser = (req, res) => {
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
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  const owner = req.user._id;

  User.findByIdAndUpdate(owner, { name, about }, { runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err) {
        res.status(404).send({ message: 'Введены некорректные данные' });
      }
      if (err) {
        res.status(400).send({ message: 'Пользователь не найден' });
      }
      if (err) {
        res.status(500).send({ message: err.message });
      }
    });
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  const owner = req.user._id;

  User.findByIdAndUpdate(owner, { avatar }, { new: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err) {
        res.status(404).send({ message: 'Пользователь не найден' });
      }
      if (err) {
        res.status(400).send({ message: 'Введены некорректные данные' });
      }
      if (err) {
        res.status(500).send({ message: err.message });
      }
    });
};
