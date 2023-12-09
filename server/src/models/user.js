const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 60
  },
  avatar: {
    type: String,
    trim: true
  },
  deletedAt: {
    type: Date,
    default: null
  }
})

class User {
  delete () {
    this.deletedAt = Date.now()
    return this.save()
  }

  changeAvatar (url) {
    this.avatar = url
    return this.save()
  }
}

userSchema.plugin(passportLocalMongoose, {
  usernameField: 'email',
  lastLoginField: true
})

userSchema.loadClass(User)

module.exports = mongoose.model('User', userSchema, 'users')
