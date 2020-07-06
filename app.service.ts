import { Injectable } from '@nestjs/common';
// --------------------------------------------------
import { Logger } from './logger';
// --------------------------------------------------
const logger = new Logger('AppService');
// --------------------------------------------------

@Injectable()
export class AppService {
  test(): any {
    logger.method('test');
    return {
      method: 'test',
      message: 'works',
      date: new Date(),
    };
  }
}
