// user.route.ts

import { FastifyInstance } from 'fastify'

import { registerUserHandler } from './user.controller.ts'

async function userRoutes(server: FastifyInstance) {
  server.post('/', registerUserHandler)
}

export default userRoutes
