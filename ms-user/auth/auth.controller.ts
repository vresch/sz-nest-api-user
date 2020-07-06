import {
  Controller,
  Post,
  Body,
  ValidationPipe,
} from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
// --------------------------------------------------
import { AuthDto, AuthRes } from './auth.dto';
import { AuthService } from './auth.service';
// --------------------------------------------------
import { Logger } from './../../logger';
// --------------------------------------------------
const logger = new Logger('AuthController');
// --------------------------------------------------

@ApiUseTags('auth')
@Controller('ms-user/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signUp')
  async signUp(
    @Body(ValidationPipe) dto: AuthDto.SignUp,
  ): Promise<AuthRes.SignUp> {
    logger.method('signUp');
    return await this.authService.signUp(dto);
  }

  @Post('login')
  async login(
    @Body(ValidationPipe) dto: AuthDto.Login,
  ): Promise<AuthRes.Login> {
    logger.method('login');
    return await this.authService.login(dto);
  }

  @Post('logout')
  async logout(
    @Body(ValidationPipe) dto: AuthDto.Logout,
  ): Promise<AuthRes.Logout> {
    logger.method('logout');
    return await this.authService.logout(dto);
  }

  @Post('forgotPassword')
  async forgotPassword(
    @Body(ValidationPipe) dto: AuthDto.ForgotPassword,
  ): Promise<AuthRes.ForgotPassword> {
    logger.method('forgotPassword');
    return await this.authService.forgotPassword(dto);
  }

  @Post('resetPassword')
  async resetPassword(
    @Body(ValidationPipe) dto: AuthDto.ResetPassword,
  ): Promise<AuthRes.ResetPassword> {
    logger.method('resetPassword');
    return await this.authService.resetPassword(dto);
  }

  @Post('refreshSession')
  async refreshSession(
    @Body(ValidationPipe) dto: AuthDto.RefreshSession,
  ): Promise<AuthRes.RefreshSession> {
    logger.method('refreshSession');
    return await this.authService.refreshSession(dto);
  }
}
