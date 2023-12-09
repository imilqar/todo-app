const router = require('express-promise-router')()
const { celebrate, Joi, Segments } = require('celebrate')
const User = require('../models/user')
const { isLoggedIn } = require('../middlewares/auth')
const upload = require('../middlewares/upload')

router.get('/',
  isLoggedIn,
  async (req, res) => {
    res.json(req.user)
  }
)

const updateProfileValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    profile: Joi.object().keys({
      name: Joi.string().min(3).max(60).trim(),
      email: Joi.string().email()
    })
  })
})

router.put('/',
  isLoggedIn,
  updateProfileValidator,
  async (req, res) => {
    await User.updateOne(req.user._id, req.body.profile)
    res.sendStatus(200)
  }
)

const changePasswordValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    oldPassword: Joi.string().min(8).required(),
    newPassword: Joi.string().min(8).required()
  })
})

router.patch('/change-password',
  isLoggedIn,
  changePasswordValidator,
  async (req, res) => {
    const user = req.user
    user.changePassword(req.body.oldPassword, req.body.newPassword, () => {
      user.save()
    })
    res.sendStatus(200)
  }
)

router.patch('/upload/avatar/',
  isLoggedIn,
  upload.single('avatar'),
  async (req, res) => {
    const user = await User.findById(req.user._id)
    await user.changeAvatar(req.file.filename)
    res.sendStatus(200)
  })

router.delete('/', isLoggedIn, async (req, res, next) => {
  await req.user.delete()
  req.logout((err) => {
    if (err) { return next(err) }
    res.sendStatus(200)
  })
  res.sendStatus(200)
})

module.exports = router
