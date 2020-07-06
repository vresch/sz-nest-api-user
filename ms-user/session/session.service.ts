import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// --------------------------------------------------
import { ISession } from './session.interface';
import { TokenService } from './token.service';
import { SessionException } from './session.exception';
// --------------------------------------------------
import { Logger } from './../../logger';
import { DatabaseCode, UserConfig } from './../../config';
// --------------------------------------------------
const logger = new Logger('SessionService');
// --------------------------------------------------

@Injectable()
export class SessionService implements OnModuleInit {
  constructor(
    @InjectModel('Session')
    private readonly sessionModel: Model<ISession.Session>,
    private readonly tokenServise: TokenService,
  ) {}

  async onModuleInit() {
    logger.log('session module initiated');
    logger.log('clean up all sessions');
    return await this.deleteSessionList({});

  }

  async getSessionList(dto) {
    logger.log('getSessionList');
    return await this.sessionModel.find();
  }

  async getSession(dto) {
    logger.log('getSession');
    return await this.sessionModel.findById(dto.id).exec();
  }

  async createSession(dto) {
    logger.log('createSession');
    const { _id: userId, email } = dto.user;
    const token = await this.tokenServise.createToken({ email });
    const session = new this.sessionModel({
      userId,
      accessToken: token,
      createdAt: Date.now(),
      expireAt: this.getExpireAtDate(Date.now()),
    });
    try {
      await session.save();
    } catch (error) {
      logger.error(error);
      if (error.code === DatabaseCode.duplicateKey) {
        SessionException.sessionDuplicate();
      }
      SessionException.sessionCreationAborted();
    }
    return session;
  }

  async updateSession(dto) {
    logger.log('updateSession');
    return {
      method: 'updateSession',
      dto,
    };
  }

  async deleteSession(dto) {
    logger.log('deleteSession');
    return await this.sessionModel.deleteMany({
      userId: dto.user._id,
    });
  }

  async deleteSessionList(dto) {
    logger.log('deleteSessionList');
    return await this.sessionModel.deleteMany(dto);
  }

  async checkSession(dto) {
    logger.log('checkSession');
    return await this.sessionModel.findById(dto.id).exec();
  }

  private getExpireAtDate(date) {
    return (
      date + UserConfig.sessionExpireIn * 1000 - 60*1000
    );
  }
}
