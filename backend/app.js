require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const { errors } = require('celebrate');
const users = require('./routes/users.js');
const cards = require('./routes/cards.js');
const auth = require('./middlewares/auth');
const { login, createUser } = require('./controllers/users');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { validateUser, validateLogin } = require('./middlewares/requestValidation');
const { corsOption } = require('./middlewares/corsOption');
const NotFoundError = require('./errors/NotFoundError.js');

const { PORT = 3000 } = process.env;

const app = express();

app.use(helmet());

app.use(cookieParser());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Limiting to 100 requests per windowMs',
});

app.use(limiter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(cors(corsOption));

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', validateLogin, login);
app.post('/signup', validateUser, createUser);

app.use('/', auth, users);
app.use('/', auth, cards);

app.use(errorLogger);
app.use(errors());

app.use('*', () => {
  throw new NotFoundError({ message: 'Page not found!' });
});

app.use((err, req, res, next) => {
  if (err.status) {
    res
      .status(err.status)
      .send(err.message);
    return;
  }
  res
    .status(500)
    .send({ message: `Server error: ${err.name}` });
  next();
});

app.listen(PORT);
