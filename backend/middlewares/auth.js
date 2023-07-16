const jwt = require('jsonwebtoken')
const UnauthorizedErr = require('../errors/unauthorized-err')

module.exports = (req, res, next) => {
  const { authorization } = req.headers
  // console.log('authorization   ----> ', authorization);

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedErr('Необходима авторизация1'))
  }

  const token = authorization.replace('Bearer ', '')
  let payload

  // console.log('token   ----> ', token);

  try {
    payload = jwt.verify(token, 'some-secret-key')
  } catch (err) {
    next(new UnauthorizedErr('Необходима авторизация2'))
  }

  req.user = payload // записываем пейлоуд в объект запроса

  // console.log('payload   ----> ', payload);
  return next() // пропускаем запрос дальше
}
