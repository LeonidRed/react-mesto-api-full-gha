require('dotenv').config()
const jwt = require('jsonwebtoken')
const UnauthorizedErr = require('../errors/unauthorized-err')

const { NODE_ENV, JWT_SECRET } = process.env

module.exports = (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedErr('Необходима авторизация'))
  }

  const token = authorization.replace('Bearer ', '')
  let payload

  try {
    payload = jwt.verify(token, `${NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret'}`)
  } catch (err) {
    next(new UnauthorizedErr('Необходима авторизация'))
  }

  req.user = payload // записываем пейлоуд в объект запроса

  return next() // пропускаем запрос дальше
}
