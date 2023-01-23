import jwt from 'jsonwebtoken';
import UnauthorizedError from '../errors/unauthorized-error.js';
import ForbiddenError from '../errors/forbidden-error.js';

const { JWT_SECRET, NODE_ENV } = process.env;

// eslint-disable-next-line consistent-return
export default function tokenVerification(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Необходима авторизация');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev_secret');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error.name);
    throw new ForbiddenError('Нет доступа');
  }

  req.user = payload;

  return next();
}
