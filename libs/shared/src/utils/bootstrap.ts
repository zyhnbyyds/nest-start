import compression from '@fastify/compress'
import fastifyCsrf from '@fastify/csrf-protection'
import secureSession, { SecureSessionPluginOptions } from '@fastify/secure-session'
import { DynamicModule, Logger, Type, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { WinstonModule } from 'nest-winston'
import { AllExceptionsFilter } from '../filters/all-exceptions.filter'
import { LoggingInterceptor } from '../interceptors/Logger.interceptor'
import { TimezoneInterceptor } from '../interceptors/TimeZone.interceptor'
import { winstonLoggerOptions } from './logger'

export interface BootstrapOptions {
  name: string
  port: number
  prefix?: string
  logger?: boolean
  secureSession?: SecureSessionPluginOptions
  fastifyCsrf?: boolean
  module: Type<any> | DynamicModule | Promise<DynamicModule>
  allExceptionsFilter?: boolean
  compression?: boolean
  globalValidate?: boolean
}

export interface MicroBootstrapOptions {
  name: string
  module: Type<any> | DynamicModule | Promise<DynamicModule>
}

/**
 * common bootstrap runner 通用启动器封装
 * @param options BootstrapOptions 启动配置
 */
export async function bootstrap(options: BootstrapOptions) {
  if (process.env.NODE_ENV === 'prod') {
    process.env.TZ = 'UTC'
  }

  const app = await NestFactory.create<NestFastifyApplication>(options.module, new FastifyAdapter())

  // eslint-disable-next-line style/max-statements-per-line
  app.getHttpAdapter().getInstance().decorateReply('setHeader', function (key, value) { this.raw.setHeader(key, value) })
  // eslint-disable-next-line style/max-statements-per-line
  app.getHttpAdapter().getInstance().decorateReply('end', function () { this.raw.end() })

  if (process.env.IS_LOG_EVERY_REQ === 'Y') {
    app.useGlobalInterceptors(new LoggingInterceptor())
  }

  app.useGlobalInterceptors(new TimezoneInterceptor())

  if (options.allExceptionsFilter)
    app.useGlobalFilters(new AllExceptionsFilter())

  if (options.prefix)
    app.setGlobalPrefix(options.prefix)

  if (options.globalValidate) {
    app.useGlobalPipes(new ValidationPipe({ stopAtFirstError: true }))
  }

  if (options.secureSession)
    await app.register(secureSession, options.secureSession)

  if (options.fastifyCsrf)
    await app.register(fastifyCsrf)

  if (options.compression)
    await app.register(compression)

  app.useLogger(WinstonModule.createLogger(winstonLoggerOptions))

  app.enableCors()

  await app.listen({
    port: options.port,
    host: '0.0.0.0',
  })

  Logger.log(`App${options.name} running on the ${options.port}`)
}
