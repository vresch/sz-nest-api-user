import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
// --------------------------------------------------
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthStrategy } from './auth.strategy';
// --------------------------------------------------
import { UserModule } from './../user';
import { SessionModule } from './../session';
import { UserConfig } from './../../config';
// --------------------------------------------------

@Module({
  imports: [
    UserModule,
    SessionModule,
    PassportModule.register(UserConfig.authStrategy),
  ],
  exports: [AuthService, AuthStrategy, PassportModule],
  providers: [AuthService, AuthStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
