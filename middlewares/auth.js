import jwt from 'jsonwebtoken';

const { JWT_SECRET, NODE_ENV } = process.env;

// eslint-disable-next-line consistent-return
export default function tokenVerification(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).send({ message: 'Необходима авторизация' });
  }

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev_secret');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error.name);
    return res.status(403).send({ message: 'Нет доступа' });
  }

  req.user = payload;

  next();
}
