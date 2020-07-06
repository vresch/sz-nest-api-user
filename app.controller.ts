import { Controller, Get } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
// --------------------------------------------------
import { AppService } from './app.service';
import { Logger } from './logger';
// --------------------------------------------------
const logger = new Logger('AppController');
// --------------------------------------------------

@ApiUseTags('app')
@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('test')
  test(): any {
    logger.method('test');
    return this.appService.test();
  }
}
