import {
  InternalServerErrorException,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';

export class SessionException {
  static sessionNotFound() {
    throw new UnauthorizedException({
      message: 'Session Not Found',
    });
  }

  static sessionDuplicate() {
    throw new ConflictException({
      message: 'Session For User Already Exists',
    });
  }

  static sessionCreationAborted() {
    throw new InternalServerErrorException({
      message: 'Session Creation Aborted',
    });
  }
}
