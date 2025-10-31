// user.route.ts

import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'

async function userRoutes(server: FastifyInstance) {
  server.get('/', (req: FastifyRequest, reply: FastifyReply) => {
    reply.send({ message: '/ route hit' })
  })
  server.post('/register', () => {})
  server.post('/login', () => {})
  server.delete('/logout', () => {})
  server.log.info('user routes registered')
}

export default userRoutes
