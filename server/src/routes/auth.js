const createError = require('http-errors')
const router = require('express-promise-router')()
const passport = require('passport')
const { celebrate, Joi, Segments } = require('celebrate')
const User = require('../models/user')
const { ensureNoActiveSession, ensureAuth } = require('../middlewares/auth')

const registerUserValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    user: Joi.object().keys({
      name: Joi.string().min(3).max(60).trim().required(),
      email: Joi.string().email().required()
    }),
    password: Joi.string().min(8).required()
  })
})

router.post(
  '/register',
  ensureNoActiveSession,
  registerUserValidator,
  async (req, res) => {
    const newUser = new User(req.body.user)
    await User.register(newUser, req.body.password)

    res.sendStatus(200)
  }
)

router.post(
  '/login',
  ensureNoActiveSession,
  passport.authenticate('local', {
    successRedirect: '/api/auth/authenticated',
    failureRedirect: '/api/auth/unauthorized'
  })
)

router.get('/authenticated', async (req, res) => {
  res.json(req.user)
})

router.get('/unauthorized', async (req, res) => {
  throw createError(401)
})

router.post(
  '/logout',
  ensureAuth,
  (req, res, next) => {
    req.session.destroy(err => {
      if (err) {
        throw createError(500, err.message)
      }
      req.logout((err) => {
        if (err) { return next(err) }
        res.sendStatus(200)
      })
    })
  })

module.exports = router
