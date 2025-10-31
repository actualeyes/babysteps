import pino, { Level } from 'pino'

export { Level }

type CreateLoggerArgs = {
  level: Level
  isDev: boolean
}

export const createLogger = ({ level, isDev }: CreateLoggerArgs) =>
  pino({
    level,
    redact: [],
    formatters: {
      level: label => {
        return { level: label.toUpperCase() }
      }
    },
    ...(isDev && { transport: { target: 'pino-pretty' } })
  })
