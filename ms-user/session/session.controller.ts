import {
  Controller,
  Post,
  Body,
  ValidationPipe,
} from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
// --------------------------------------------------
import { SessionService } from './session.service';
import { SessionDto, SessionRes } from './session.dto';
// --------------------------------------------------
import { Logger } from './../../logger';
// --------------------------------------------------
const logger = new Logger('SessionController');
// --------------------------------------------------

@ApiUseTags('session')
@Controller('ms-user/session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post('getSessionList')
  async getSessionList(
    @Body(ValidationPipe) dto: SessionDto.GetSessionList,
  ): Promise<SessionRes.GetSessionList> {
    logger.method('getSessionList');
    return await this.sessionService.getSessionList(dto);
  }

  @Post('getSession')
  async getSession(
    @Body(ValidationPipe) dto: SessionDto.GetSession,
  ): Promise<SessionRes.GetSession> {
    logger.method('getSession');
    return await this.sessionService.getSession(dto);
  }

  @Post('createSession')
  async createSession(
    @Body(ValidationPipe) dto: SessionDto.CreateSession,
  ): Promise<SessionRes.CreateSession> {
    logger.method('createSession');
    return await this.sessionService.createSession(dto);
  }

  @Post('updateSession')
  async updateSession(
    @Body(ValidationPipe) dto: SessionDto.UpdateSession,
  ): Promise<SessionRes.UpdateSession> {
    logger.method('updateSession');
    return await this.sessionService.updateSession(dto);
  }

  @Post('deleteSession')
  async deleteSession(
    @Body(ValidationPipe) dto: SessionDto.DeleteSession,
  ): Promise<SessionRes.DeleteSession> {
    logger.method('deleteSession');
    return await this.sessionService.deleteSession(dto);
  }

  @Post('deleteSessionList')
  async deleteSessionList(
    @Body(ValidationPipe) dto: SessionDto.DeleteSessionList,
  ): Promise<SessionRes.DeleteSessionList> {
    logger.method('deleteSessionList');
    return await this.sessionService.deleteSessionList(dto);
  }
}
