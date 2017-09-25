import test from 'ava'

import Joi from 'joi'
import cast from '..'

const next = err => {
  return err
    ? Promise.reject(err)
    : Promise.resolve()
}

const schema = Joi.object().keys({
  a: Joi.string().lowercase()
})

const initial = () => ({ a: 'Exo' })
const expected = () => ({ a: 'exo' })

test('.params(schema)', async t => {
  const fn = cast.params(schema)

  const ctx = {
    params: initial()
  }

  await fn(ctx, next)

  t.deepEqual(ctx.params, expected())
})

test('.body(schema)', async t => {
  const fn = cast.body(schema)

  const ctx = {
    request: {
      body: initial()
    }
  }

  await fn(ctx, next)

  t.deepEqual(ctx.request.body, expected())
})

test('.headers(schema)', async t => {
  const fn = cast.headers(schema)

  const ctx = {
    request: {
      headers: initial()
    }
  }

  await fn(ctx, next)

  t.deepEqual(ctx.request.headers, expected())
})

test('.query(schema)', async t => {
  const fn = cast.query(schema)

  const ctx = {
    request: {
      query: initial()
    }
  }

  await fn(ctx, next)

  t.deepEqual(ctx.request.query, expected())
})
