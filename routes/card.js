// eslint-disable-next-line no-undef
const cardRouter = require('express').Router();
import { getCards, createCard, deleteCard, likeCard, dislikeCard } from '../controllers/card';

cardRouter.get('/', getCards);
cardRouter.post('/', createCard);
cardRouter.delete('/:cardId', deleteCard);
cardRouter.put('/:cardId/likes', likeCard);
cardRouter.delete('/:cardId/likes', dislikeCard);

export default cardRouter;
