import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
// --------------------------------------------------
import { ISession } from './session.interface';
// --------------------------------------------------
import { Logger } from './../../logger';
// --------------------------------------------------
const logger = new Logger('TokenService');
// --------------------------------------------------

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  async createToken(payload) {
    const tokenPayload = this.createTokenPayload(payload);
    return await this.jwtService.sign(tokenPayload);
  }

  private createTokenPayload(payload): ISession.TokenPayload {
    return {
      ...payload,
      iat: Date.now(),
    };
  }
}
