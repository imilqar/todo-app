const createError = require('http-errors')
const ObjectId = require('mongoose').Types.ObjectId

module.exports = function validateObjectId (id) {
  if (!ObjectId.isValid(id)) throw createError(404)
}
