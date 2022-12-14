import express from 'express';
import {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} from '../controllers/card.js';

const cardRouter = express.Router();

cardRouter.get('/', getCards);
cardRouter.post('/', createCard);
cardRouter.delete('/:cardId', deleteCard);
cardRouter.put('/:cardId/likes', likeCard);
cardRouter.delete('/:cardId/likes', dislikeCard);

export default cardRouter;
