import { Module } from '@nestjs/common';
import { PlayController } from './play.controller';
import { PlayService } from './play.service';

@Module({
  imports: [],
  controllers: [PlayController],
  providers: [PlayService],
})
export class PlayModule {}
