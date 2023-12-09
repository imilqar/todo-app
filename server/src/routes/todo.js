const createError = require('http-errors')
const router = require('express-promise-router')()
const { celebrate, Joi, Segments } = require('celebrate')
const Todo = require('../models/todo')
const { ensureAuth } = require('../middlewares/auth')

router.get(
  '/',
  ensureAuth,
  async (req, res) => {
    const total = await Todo.countDocuments()
    const todos = await Todo.findByAuthor(req.user).sort({ completedAt: 'asc', createdAt: 'asc' }).exec()

    res.json({ total, todos })
  })

router.get(
  '/completed',
  ensureAuth,
  async (req, res) => {
    const total = await Todo.countDocuments({ isCompleted: true })
    const completedTodos = await Todo.findCompeleted(req.user)

    res.json({ total, completedTodos })
  })

router.get(
  '/:slug',
  ensureAuth,
  async (req, res) => {
    const todo = await Todo.findBySlug(req.user, req.params.slug)
    if (!todo) throw createError(404)
    res.json(todo)
  })

const createTodoValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    todo: Joi.object().keys({
      title: Joi.string().min(3).max(120).required(),
      body: Joi.string()
    })
  })
})

router.post(
  '/',
  ensureAuth,
  createTodoValidator,
  async (req, res) => {
    const newTodo = new Todo(req.body.todo)
    newTodo.author = req.user
    await newTodo.save()
    res.sendStatus(200)
  })

const updateTodoValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    todo: Joi.object().keys({
      title: Joi.string().min(3).max(120),
      body: Joi.string().optional()
    })
  })
})

router.put(
  '/:slug',
  ensureAuth,
  updateTodoValidator,
  async (req, res) => {
    await Todo.updateBySlug(req.user, req.params.slug, req.body.todo)
    res.sendStatus(200)
  })

router.patch(
  '/complete/:slug',
  ensureAuth,
  async (req, res) => {
    const todo = await Todo.findBySlug(req.user, req.params.slug)
    if (!todo) throw createError(404)

    await todo.complete()
    res.sendStatus(200)
  })

router.delete(
  '/:slug',
  ensureAuth,
  async (req, res) => {
    await Todo.deleteBySlug(req.user, req.params.slug)
    res.sendStatus(200)
  })

module.exports = router
