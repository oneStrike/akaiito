import { createLogger, format, Logger, transports } from 'winston'

const { combine, timestamp, printf } = format

const logFormat = printf(({ level, message, timestamp, context }) => {
  return `${timestamp} [${context}] ${level}: ${message}`
})

export const loggerFactory = {
  provide: 'LOGGER',
  useFactory: (): Logger => {
    return createLogger({
      level: process.env.LOG_LEVEL || 'debug',
      format: combine(format.splat(), format.simple(), timestamp(), logFormat),
      transports: [
        new transports.Console({
          format: combine(format.colorize(), format.simple()),
        }),
        // 生产环境可添加Logtail等远程日志服务
        // new Logtail(process.env.LOGTAIL_TOKEN)
      ],
    })
  },
}
