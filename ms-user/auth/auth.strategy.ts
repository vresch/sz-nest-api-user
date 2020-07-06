import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
// --------------------------------------------------
import { IAuth } from './auth.interface';
// --------------------------------------------------
import { UserService } from './../user';
import { UserConfig } from './../../config';
// --------------------------------------------------

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: UserConfig.jwt.secret,
    });
  }

  async validate(payload: IAuth.TokenPayload) {
    const { email } = payload;
    return await this.userService.findUserByEmail({ email });
  }
}
