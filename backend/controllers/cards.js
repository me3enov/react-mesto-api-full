const Card = require('../models/card');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate('user')
    .then((cards) => res.status(200).send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => {
      res
        .status(200)
        .send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError({ message: `Incorrect card data: ${err.message}` }));
      } else {
        next(err);
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  const id = req.params._id;
  const owner = req.user._id;

  Card.findById(id)
    .orFail(new NotFoundError({ message: 'Card not found!' }))
    .then((card) => {
      if (card.owner.toString() === owner) {
        return Card.findByIdAndRemove(id)
          .orFail(new NotFoundError({ message: 'Card not found!' }))
          .then((data) => {
            res.status(200).send({ data });
          })
          .catch((err) => {
            if (err.name === 'CastError') {
              next(new BadRequestError({ message: 'Card not found!' }));
            } else {
              next(err);
            }
          });
      }
      return next(new ForbiddenError({ message: 'Access is denied!' }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError({ message: 'Card not found!' }));
      } else {
        next(err);
      }
    });
};

module.exports.likeCard = (req, res, next) => {
  const id = req.params._id;
  const owner = req.user._id;

  Card.findByIdAndUpdate(
    id,
    { $addToSet: { likes: owner } },
    { new: true },
  )
    .orFail(new NotFoundError({ message: 'Card not found!' }))
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError({ message: 'Card not found!' }));
      } else {
        next(err);
      }
    });
};

module.exports.dislikeCard = (req, res, next) => {
  const id = req.params._id;
  const owner = req.user._id;

  Card.findByIdAndUpdate(
    id,
    { $pull: { likes: owner } },
    { new: true },
  )
    .orFail(new NotFoundError({ message: 'Card not found!' }))
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError({ message: 'Card not found!' }));
      } else {
        next(err);
      }
    });
};
