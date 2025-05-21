/**
 * Redis微服务调用注册
 */
// export const RedisModuleRegister: ClientProviderOptions = {
//   name: MicroServiceNameEnum.REDIS_SERVICE,
//   transport: Transport.REDIS,
//   options: {
//     port: SubAppPortEnum.Redis,
//     host: LocalHost,
//   },
// }

// 动态模块
/**
 * JWT注册
 */
// export const JwtModuleImport = JwtModule.registerAsync({
//   imports: [ConfigModule],
//   global: true,
//   useFactory: (configService: ConfigService) => {
//     const { secret, expiresIn } = configService.get<AuthConfig>('jwt')!
//     return {
//       secret,
//       signOptions: {
//         expiresIn,
//       },
//     }
//   },
//   inject: [ConfigService],
// })
