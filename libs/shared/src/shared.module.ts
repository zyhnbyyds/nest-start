import { Global, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { databaseConfig, jwtConfig, redisConfig } from './config'
import RedisFactory from './factories/redis.factory'
import { PrismaService } from './services/prisma.service'
import { customValidateEnv } from './utils/env'

/**
 * Common module 通用模块
 */
@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: customValidateEnv,
      load: [redisConfig, databaseConfig, jwtConfig],
      envFilePath: ['.env', `.env.${process.env.NODE_ENV}`],
    }),
    // TODO: fix 修复在微服务调用情况下的rate limit报错
    // ThrottlerModule.forRootAsync({
    //   useFactory() {
    //     const redis = RedisFactory
    //     return {
    //       storage: new ThrottlerStorageRedisService(redis),
    //       throttlers: [
    //         {
    //           limit: 300,
    //           ttl: 20000,
    //         },
    //       ],
    //     }
    //   },
    // }),

    // , { provide: APP_GUARD, useClass: ThrottlerGuard }
  ],
  providers: [PrismaService, RedisFactory],
  exports: [PrismaService, RedisFactory],
})
export class SharedModule {}
