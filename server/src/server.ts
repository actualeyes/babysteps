import Fastify from 'fastify'
import env from '@fastify/env'

const schema = {
  type: 'object',
  required: ['PORT', 'DATABASE_URL'],
  properties: {
    PORT: {
      type: 'string',
      default: 3000
    },
    DATABASE_URL: {
      type: 'string'
    },
    PINO_LOG_LEVEL: {
      type: 'string',
      default: 'error'
    },
    NODE_ENV: {
      type: 'string',
      default: 'production'
    }
  }
}

const options = {
  schema: schema,
  dotenv: true
}

declare module 'fastify' {
  interface FastifyInstance {
    config: {
      PORT: string
      DATABASE_URL: string
      PINO_LOG_LEVEL: string
      NODE_ENV: string
    }
  }
}

export const createServer = async () => {
  const fastify = Fastify({
    logger: true
  })

  /* Register Plugins */
  await fastify.register(env, options).after()

  fastify.get('/ping', (request, reply) => {
    reply.send({ message: 'pong' })
  })

  fastify.get('/healthcheck', (req, res) => {
    res.send({ message: 'Success' })
  })

  return fastify
}
