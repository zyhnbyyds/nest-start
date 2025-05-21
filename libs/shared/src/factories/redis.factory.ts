import { Provider } from '@nestjs/common'
import Redis from 'ioredis'
import { customValidateEnv } from '../utils/env'

const RedisFactory: Provider = {
  provide: 'RedisInstance',
  useFactory: () => {
    const { REDIS_PORT, REDIS_HOST, REDIS_PASSWORD } = customValidateEnv(process.env)

    return new Redis({
      port: REDIS_PORT,
      host: REDIS_HOST,
      password: REDIS_PASSWORD,
    })
  },
}

export default RedisFactory
