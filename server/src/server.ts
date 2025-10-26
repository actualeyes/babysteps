import Fastify from 'fastify'

export const createServer = async () => {
  const fastify = Fastify({
    logger: true
  })

  fastify.get('/ping', (request, reply) => {
    reply.send({ message: 'pong' })
  })

  return fastify
}
