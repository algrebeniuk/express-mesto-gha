import Card from '../models/card.js';
import BadRequest from '../errors/bad-request.js';
import NotFoundError from '../errors/not-found-error.js';
import ForbiddenError from '../errors/forbidden-error.js';

export function getCards(req, res, next) {
  Card.find({})
    .then((card) => res.send(card))
    .catch(next);
}

export function createCard(req, res, next) {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw next(new BadRequest('Введены некорректные данные'));
      } else {
        next(err);
      }
    });
}

export function deleteCard(req, res, next) {
  const { cardId } = req.params;
  Card.findByIdAndRemove(cardId)
    .orFail(new NotFoundError('Карточка не найдена'))
    .then(async (card) => {
      if (JSON.stringify(card.owner) !== JSON.stringify(req.user.payload)) {
        throw next(new ForbiddenError('Невозможно удалить чужую карточку'));
      }
      await card.remove();
      return res.send({ message: 'Карточка удалена' });
    })
    .catch((err) => {
      if (err.message === 'NotValidId') {
        throw next(new BadRequest('Введены некорректные данные'));
      }
      if (err.name === 'CastError') {
        throw next(new BadRequest('Введены некорректные данные'));
      }
      if (err) {
        next(err);
      }
    });
}

export function likeCard(req, res, next) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new NotFoundError('Карточка не найдена'))
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw next(new BadRequest('Введены некорректные данные'));
      }
      if (err) {
        next(err);
      }
    });
}

export function dislikeCard(req, res, next) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new NotFoundError('Карточка не найдена'))
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw next(new BadRequest('Введены некорректные данные'));
      }
      if (err) {
        next(err);
      }
    });
}
