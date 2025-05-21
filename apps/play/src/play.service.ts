import { Injectable } from '@nestjs/common';

@Injectable()
export class PlayService {
  getHello(): string {
    return 'Hello World!';
  }
}
