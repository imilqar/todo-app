const createError = require('http-errors')

function ensureNoActiveSession (req, res, next) {
  if (req.isAuthenticated()) return createError.BadRequest()
  next()
}

function ensureAuth (req, res, next) {
  if (!req.isAuthenticated()) return next(createError.Unauthorized())
  next()
}

module.exports = {
  ensureAuth,
  ensureNoActiveSession
}
