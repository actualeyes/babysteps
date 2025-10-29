import { createServer } from 'src/server'

const main = async () => {
  const fastify = await createServer()
  const port = 3000

  try {
    fastify.listen({ port }, () => {
      fastify.log.info(`Listening on ${port}...`)
    })
  } catch (error) {
    fastify.log.error('fastify.listen:', error)
    process.exit(1)
  }

  // graceful shutdown
  const listeners = ['SIGINT', 'SIGTERM']
  listeners.forEach(signal => {
    process.on(signal, async () => {
      await fastify.close()
      process.exit(0)
    })
  })
}

main()
