import Fastify from 'fastify'
import env from '@fastify/env'
import dotenv from 'dotenv'
import { createLogger, Level } from 'src/utils/logger'

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

dotenv.config()

const level = process.env.PINO_LOG_LEVEL as Level
const isDev = process.env.NODE_ENV === 'development'
const logger = createLogger({ level, isDev })

export { logger }

export const createServer = async () => {
  const fastify = Fastify({
    loggerInstance: logger
  })

  /* Register Plugins */
  await fastify.register(env, options).after()

  fastify.get('/ping', (request, reply) => {
    reply.send({ message: 'pong' })
  })

  return fastify
}
