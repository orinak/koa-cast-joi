# koa-cast-joi

[Koa][koa] casting middleware using [Joi][joi].

[koa]: https://github.com/koajs/koa
[joi]: https://github.com/hapijs/joi/

## Usage

```js
import Koa from 'koa'

import Joi from 'joi'
import cast from 'koa-cast-joi'

const app = new Koa()

const schema = Joi.object().keys({
  page: Joi.number().default(1)
})

// app.use(cast({ 'request.query': schema }))
app.use(cast.query(schema))

app.use((ctx, next) => {
  console.log('next:', ctx.request.query.page + 1)
  return next()
})

```

## Install

```sh
npm install koa-cast-joi joi
```

*Note:* Joi is a peer dependency, so it must be installed independently. 

## API

### `cast(schemata, [options], [callback])`

Cast `app.context` by given schemata and options

  - `schemata` is map of paths to coresponding Joi schemas
  - `options` is passed to `Joi.validate`
    - `options.context` is `app.context` by default
  - `callback` is passed to `Joi.validate`

### `cast.STORE(schema, [options], [callback])`

Bind schema to given STORE in following fashion

  - `cast.body` binds to `ctx.request.body`
  - `cast.query` binds to `ctx.request.query`
  - `cast.headers` binds to `ctx.request.headers`
  - `cast.params` binds to `ctx.params`

## Related

- [Celebrate](https://github.com/continuationlabs/celebrate)
- [koa-joi](https://github.com/pierreinglebert/koa-joi)

## License

MIT
