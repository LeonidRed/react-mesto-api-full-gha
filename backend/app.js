require('dotenv').config()
const helmet = require('helmet')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const { errors } = require('celebrate')
const cors = require('./middlewares/cors')
const userRoutes = require('./routes/users')
const cardRoutes = require('./routes/cards')
const {
  createUser, login,
} = require('./controllers/users')
const auth = require('./middlewares/auth')
const { validateUser, validateUserLogin } = require('./middlewares/validationUser')
const NotFoundError = require('./errors/not-found-err')
const errorHandler = require('./middlewares/errorHandler')
const { requestLogger, errorLogger } = require('./middlewares/logger')

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
}).then(() => {
  console.log('Connect to MestoDB')
})

const app = express()

app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(requestLogger)

app.use(cors)

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт')
  }, 0);
})

app.post('/signin', validateUserLogin, login)
app.post('/signup', validateUser, createUser)

app.use(auth, userRoutes)
app.use(auth, cardRoutes)
app.use(auth, ('*', (req, res, next) => next(new NotFoundError('Такого пути не существует'))))

app.use(errorLogger)

app.use(errors())
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})
