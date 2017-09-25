import test from 'ava'

import Joi from 'joi'

import cast from '..'

const next = err => {
  return err
    ? Promise.reject(err)
    : Promise.resolve()
}

const rule = Joi.number()
const pair = { a: rule }

test('basic', async t => {
  const fn = cast(pair)

  const ctx = { a: '1' }

  await fn(ctx, next)

  t.is(ctx.a, 1)
})

test('deep', async t => {
  const fn = cast({ 'a.b': rule })

  const ctx = { a: { b: '1' } }

  await fn(ctx, next)

  t.is(ctx.a.b, 1)
})

test('options', async t => {
  const fn = cast(pair)
  const noConvert = cast(pair, { convert: false })

  await t.notThrows(fn({ a: '1' }, next))
  await t.throws(noConvert({ a: '1' }, next))
})

test('context', async t => {
  const rule = Joi.any().default(Joi.ref('$b'))

  const fn = cast({ a: rule })

  const ctx = { b: 'exo' }

  await fn(ctx, next)

  t.is(ctx.a, 'exo')
})

test('callback', async t => {
  t.plan(3)

  const callback = (err, val) => {
    if (err) throw new Error('exo')
    t.pass()
    return val
  }

  const fn = cast(pair, callback)

  await t.throws(fn({ a: null }, next), 'exo')
  await t.notThrows(fn({ a: '1' }, next))
})
