import Card from '../models/card.js';

export function getCards(req, res) {
  Card.find({})
    .then((card) => res.send(card))
    .catch(() => res.status(500).send({ message: 'Карточки не найдены' }));
}

export function createCard(req, res) {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: err.message });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
}

export function deleteCard(req, res) {
  const { cardId } = req.params;
  Card.findByIdAndRemove(cardId)
    .orFail(new Error('NotValidId'))
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.message === 'NotValidId') {
        res.status(404).send({ message: 'Карточка не найдена' });
      }
      if (err.name === 'CastError') {
        res.status(400).send({ message: err.message });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
}

export function likeCard(req, res) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new Error('NotValidId'))
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.message === 'NotValidId') {
        res.status(404).send({ message: 'Карточка не найдена' });
      }
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Введены некорректные данные' });
      }
      if (err) {
        res.status(500).send({ message: err.message });
      }
    });
}

export function dislikeCard(req, res) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new Error('NotValidId'))
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.message === 'NotValidId') {
        res.status(404).send({ message: 'Карточка не найдена' });
      }
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Введены некорректные данные' });
      }
      if (err) {
        res.status(500).send({ message: err.message });
      }
    });
}
