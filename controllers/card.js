const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((card) => res.send(card))
    .catch(() => res.status(500).send({ message: 'Карточки не найдены' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user_id;

  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err) {
        res.status(400).send({ message: 'Введены некорректные данные' });
      }
      if (err) {
        res.status(500).send({ message: err.message });
      }
    });
};

module.exports.deleteCard = (req, res) => {
  Card.delete({})
    .then((card) => res.send(card))
    .catch((err) => {
      if (err) {
        res.status(404).send({ message: err.message });
      }
      if (err) {
        res.status(500).send({ message: err.message });
      }
    });
};

module.exports.likeCard = (req, res) => {
  // eslint-disable-next-line no-unused-expressions
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send(card))
    .catch((err) => {
      if (err) {
        res.status(400).send({ message: err.message });
      }
      if (err) {
        res.status(500).send({ message: err.message });
      }
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send(card))
    .catch((err) => {
      if (err) {
        res.status(400).send({ message: err.message });
      }
      if (err) {
        res.status(500).send({ message: err.message });
      }
      if (err) {
        res.status(404).send({ message: err.message });
      }
    });
};
