const card = require('express').Router();
const { validateCard, validateId } = require('../middlewares/requestValidation');
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

card.get('/cards', getCards);

card.post('/cards', validateCard, createCard);

card.delete('/cards/:_id', validateId, deleteCard);

card.put('/cards/:_id/likes', validateId, likeCard);

card.delete('/cards/:_id/likes', validateId, dislikeCard);

module.exports = card;
