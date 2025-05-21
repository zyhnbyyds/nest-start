import { Test, TestingModule } from '@nestjs/testing';
import { PlayController } from './play.controller';
import { PlayService } from './play.service';

describe('PlayController', () => {
  let playController: PlayController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PlayController],
      providers: [PlayService],
    }).compile();

    playController = app.get<PlayController>(PlayController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(playController.getHello()).toBe('Hello World!');
    });
  });
});
