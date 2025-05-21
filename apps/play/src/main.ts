import { NestFactory } from '@nestjs/core';
import { PlayModule } from './play.module';

async function bootstrap() {
  const app = await NestFactory.create(PlayModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
