import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
// --------------------------------------------------
import { SessionSchema } from './session.schema';
import { SessionController } from './session.controller';
import { SessionService } from './session.service';
import { TokenService } from './token.service';
// --------------------------------------------------
import { UserConfig } from './../../config';
// --------------------------------------------------

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Session', schema: SessionSchema },
    ]),
    JwtModule.register(UserConfig.jwt),
  ],
  exports: [
    TokenService,
    SessionService,
    MongooseModule.forFeature([
      { name: 'Session', schema: SessionSchema },
    ]),
  ],
  providers: [SessionService, TokenService],
  controllers: [SessionController],
})
export class SessionModule {}
