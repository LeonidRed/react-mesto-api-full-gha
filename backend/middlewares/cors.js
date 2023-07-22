// Массив доменов, с которых разрешены кросс-доменные запросы
const allowedCors = [
  'https://imesto.nomoredomains.xyz',
  'http://imesto.nomoredomains.xyz',
  'localhost:3000',
  // 'http://localhost:3000',
  // 'http://localhost:3002',
  // 'localhost:3001',
  // 'localhost:3002',
]

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { origin } = req.headers // Сохраняем источник запроса в переменную origin
  const { method } = req // Сохраняем тип запроса (HTTP-метод) в соответствующую переменную
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE'
  const requestHeaders = req.headers['access-control-request-headers']
  // проверяем, что источник запроса есть среди разрешённых
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin)
  }
  if (method === 'OPTIONS') {
    // разрешаем кросс-доменные запросы любых типов (по умолчанию)
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS)
    res.header('Access-Control-Allow-Headers', requestHeaders)
    // завершаем обработку запроса и возвращаем результат клиенту
    return res.end()
  }

  next()
}
