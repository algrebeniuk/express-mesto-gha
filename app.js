import express, { json } from 'express';
import { set, connect } from 'mongoose';
import { errors } from 'celebrate';
import userRouter from './routes/user.js';
import cardRouter from './routes/card.js';
import { login, createUser } from './controllers/user.js';
import auth from './middlewares/auth.js';
import NotFoundError from './errors/not-found-error.js';
import CentralizedErrorHandling from './middlewares/centralized-error-handling.js';

const { PORT = 3000 } = process.env;
const app = express();

set('strictQuery', false);
connect('mongodb://127.0.0.1:27017/mestodb');

app.use(json());

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);

app.use('/users', userRouter);
app.use('/cards', cardRouter);

app.use('*', (req, res, next) => {
  throw next(new NotFoundError('File not found'));
});

app.use(errors());

app.use(CentralizedErrorHandling);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
