import express, { json } from 'express';
import { set, connect } from 'mongoose';
import userRouter from './routes/user';
import cardRouter from './routes/card';


// eslint-disable-next-line no-undef
const { PORT = 3000 } = process.env;
const app = express();

set('strictQuery', false);
connect('mongodb://127.0.0.1:27017/mestodb');

app.use(json());

app.use((req, res, next) => {
  req.user = {
    _id: '63a4f69e70eaee54c0771591',
  };

  next();
});

app.use('/users', userRouter);
app.use('/cards', cardRouter);
app.use('*', (req, res) => {
  res.status(404).send({ message: 'File not found' });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
