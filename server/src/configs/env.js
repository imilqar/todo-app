const Joi = require('celebrate').Joi
const dotenv = require('dotenv')
dotenv.config()

const envValidationSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').default('development'),
    HOST: Joi.string().default('0.0.0.0'),
    PORT: Joi.number().integer().positive().default(8080),
    // MONGO
    MONGODB_CONNECTION_STRING: Joi.string().required().description('MongoDB url'),
    DB_NAME: Joi.string().required().description('MongoDB database name'),
    // REDIS
    REDIS_HOST: Joi.string().default('localhost'),
    REDIS_PORT: Joi.number().default(6379),
    // SESSION
    SESSION_SECRET: Joi.string().required().description('Session secret key'),
    COOKIE_MAX_AGE: Joi.number().integer().positive().default(14 * 24 * 60 * 60 * 1000)
  })
  .unknown()

const { value: environment, error } = envValidationSchema.prefs({ errors: { label: 'key' } }).validate(process.env)

if (error) {
  throw new Error(`Env validation failed: ${error.message}`)
}

environment.IS_PRODUCTION = environment.NODE_ENV === 'production'
environment.IS_TEST = environment.NODE_ENV === 'test'

module.exports = environment
