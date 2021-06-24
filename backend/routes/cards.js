const card = require('express').Router();
const auth = require('../middlewares/auth');
const { validateCard, validateId } = require('../middlewares/requestValidation');
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

card.get('/cards', getCards);

card.post('/', validateCard, createCard);

card.delete('/cards//:cardId', validateId, deleteCard);

card.put('/cards/:cardId/likes', validateId, likeCard);

card.delete('/cards/:cardId/likes', validateId, dislikeCard);

module.exports = card;
