// eslint-disable-next-line no-undef
import express  from 'express';
const cardRouter = express.Router();
import { getCards, createCard, deleteCard, likeCard, dislikeCard } from '../controllers/card.js';

cardRouter.get('/', getCards);
cardRouter.post('/', createCard);
cardRouter.delete('/:cardId', deleteCard);
cardRouter.put('/:cardId/likes', likeCard);
cardRouter.delete('/:cardId/likes', dislikeCard);

export default cardRouter;
