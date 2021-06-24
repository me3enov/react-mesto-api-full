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

card.get('/cards', auth, getCards);

card.post('/cards', validateCard, auth, createCard);

card.delete('/cards/:cardId', validateId, auth, deleteCard);

card.put('/cards/:cardId/likes', validateId, auth, likeCard);

card.delete('/cards/:cardId/likes', validateId, auth, dislikeCard);

module.exports = card;
