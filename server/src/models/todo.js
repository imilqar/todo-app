const mongoose = require('mongoose')
const slugify = require('slugify')
const mongooseAutopopulate = require('mongoose-autopopulate')

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 3,
    maxlength: 60,
    trim: true,
    required: true
  },
  slug: {
    type: String,
    lowercase: true,
    unique: true
  },
  body: {
    type: String
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    autopopulate: true,
    required: true
  },
  isCompleted: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
})

class Todo {
  static findByAuthor (author) {
    return this.find({ author })
  }

  static findBySlug (author, slug) {
    return this.findOne({ author, slug })
  }

  static findCompeleted (author) {
    return this.find({ author, isCompleted: true })
  }

  static updateBySlug (author, slug, data) {
    return this.updateOne({ author, slug }, data)
  }

  static deleteBySlug (author, slug) {
    return this.deleteOne({ author, slug })
  }

  complete () {
    this.isCompleted = true
    this.completedAt = Date.now()
    return this.save()
  }
}

todoSchema.plugin(mongooseAutopopulate)
todoSchema.loadClass(Todo)

todoSchema.pre('save', async function (next) {
  const self = this

  if (!self.slug || self.isModified('title')) {
    const slug = slugify(self.title + '-' + Math.floor(Math.random() * 999999))
    this.set({ slug })
  }

  next()
})

module.exports = mongoose.model('Todo', todoSchema, 'todos')
