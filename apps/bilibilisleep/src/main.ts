import { randomBytes } from 'node:crypto'
import { bootstrap } from '@app/shared/utils/bootstrap'
import { AppModule } from './app.module'

bootstrap({
  module: AppModule,
  name: 'sleep',
  port: 4100,
  allExceptionsFilter: true,
  logger: true,
  globalValidate: true,
  prefix: 'bilibilisleep',
  fastifyCsrf: true,
  secureSession: {
    cookie: {
      path: '/',
    },
    cookieName: 'core-cookie',
    sessionName: 'core-session',
    key: randomBytes(32),
  },
})
