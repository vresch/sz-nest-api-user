import {
  InternalServerErrorException,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';

export class UserException {
  static userNotFound() {
    throw new UnauthorizedException({
      message: 'User Not Found',
    });
  }

  static userPasswordNotValid() {
    throw new UnauthorizedException({
      message: 'User Password Not Valid',
    });
  }

  static userDuplicateEmail() {
    throw new ConflictException({
      message: 'Email Already Exists',
    });
  }

  static userCreationAborted() {
    throw new InternalServerErrorException({
      message: 'User Creation Aborted',
    });
  }

  static userUpdateAborted() {
    throw new InternalServerErrorException({
      message: 'User Update Aborted',
    });
  }
}
