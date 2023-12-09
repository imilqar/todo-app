const createError = require('http-errors')

function isLoggedIn (req, res, next) {
  if (req.isAuthenticated()) return next()

  next(createError.Unauthorized())
}

module.exports = {
  isLoggedIn,
}
