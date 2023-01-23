import jwt from 'jsonwebtoken';
import UnauthorizedError from '../errors/unauthorized-error.js';

const { JWT_SECRET, NODE_ENV } = process.env;

// eslint-disable-next-line consistent-return
export default function tokenVerification(req, res, next) {
  const { authorization } = req.headers;

  let payload;

  try {
    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new UnauthorizedError('Необходима авторизация');
    }
    const token = authorization.replace('Bearer ', '');
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev_secret');
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err.name);
    next(err);
  }

  req.user = payload;

  next();
}
