const Joi = require('joi')

const dotProp = require('dot-prop')

const { assign } = Object

const genericCallback = (err, value) => {
  if (err) throw err
  return value
}

const cast = (schemata, options, callback) => {
  return async (context, next) => {
    if (typeof options === 'function') {
      callback = options
      options = {}
    }

    options = assign({ context }, options)
    callback = callback || genericCallback

    const validate = (path, schema) => {
      const val = dotProp.get(context, path)
      const res = Joi.validate(val, schema, options, callback)

      dotProp.set(context, path, res)
    }

    Object
      .entries(schemata)
      .forEach(pair => validate(...pair))

    return next()
  }
}

/**
 * Expose
 */

module.exports = cast

module.exports.params = (schema, ...args) => {
  const pair = { 'params': schema }
  return cast(pair, ...args)
}

module.exports.body = (schema, ...args) => {
  const pair = { 'request.body': schema }
  return cast(pair, ...args)
}

module.exports.headers = (schema, ...args) => {
  const pair = { 'request.headers': schema }
  return cast(pair, ...args)
}
module.exports.query = (schema, ...args) => {
  const pair = { 'request.query': schema }
  return cast(pair, ...args)
}
