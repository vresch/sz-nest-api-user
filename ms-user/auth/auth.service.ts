import { Injectable } from '@nestjs/common';
import { MailerService } from '@nest-modules/mailer';
import * as bcrypt from 'bcrypt';
import * as PasswordGenerator from 'generate-password';
// --------------------------------------------------
import { AuthDto, AuthRes } from './auth.dto';
// --------------------------------------------------
import { UserService } from './../user';
import { SessionService } from './../session';
import { Logger } from './../../logger';
import { UserConfig, ServerConfig } from './../../config';
// --------------------------------------------------
const logger = new Logger('AuthService');
// --------------------------------------------------

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly sessionService: SessionService,
    private readonly mailerService: MailerService,
  ) {}

  public async signUp(dto: AuthDto.SignUp): Promise<AuthRes.SignUp> {
    logger.dto('signUp', dto);
    const user = await this.userService.createUser(dto);
    logger.obj('user', user);
    const session = await this.sessionService.createSession({
      user,
    });
    logger.obj('session', session);
    return session;
  }

  public async login(dto: AuthDto.Login): Promise<AuthRes.Login> {
    logger.dto('login', dto);
    const user = await this.userService.validateUser(dto);
    logger.obj('user', user);
    const session = await this.sessionService.createSession({
      user,
    });
    logger.obj('session', session);
    return session;
  }

  public async logout(dto: AuthDto.Logout): Promise<AuthRes.Logout> {
    logger.dto('logout', dto);
    const response = await this.sessionService.deleteSession(dto);
    logger.obj('response', response);
    return response;
  }

  public async forgotPassword(
    dto: AuthDto.ForgotPassword,
  ): Promise<AuthRes.ForgotPassword> {
    logger.dto('forgotPassword', dto);
    const successulResponse = {
      method: 'forgotPassword',
      message: 'New Password has been sent to the email',
    }
    try {
      const user = await this.userService.findUserByEmail(dto);
      const salt = await bcrypt.genSalt();
      const generatedPassword = await this.generatePassword();
      const password = await bcrypt.hash(generatedPassword, salt);
      // save to collection 'forgot-password' with ttl~1 hour

      const mailOptions = {
        to: user.email,
        subject: `[${ServerConfig.appName}] Password Recovery`,
        text: `We received a request to renew a password for this email registered in our system ${ServerConfig.appName}.
        New Password: ${generatedPassword}`,
      };
      logger.obj('mailOptions', mailOptions);
      this.mailerService.sendMail(mailOptions);
      logger.log('Mail has been sent');

      // update user after confirmation from email
      // or check `forgot-password` collection before `users` collection on auth
      user.salt = salt;
      user.password = password;
      await this.userService.updateUser(user);

      return successulResponse;
    } catch (err) {
      // notify devOps of request of unregistered email
      return successulResponse;
    }
  }

  public async resetPassword(
    dto: AuthDto.ResetPassword,
  ): Promise<AuthRes.ResetPassword> {
    logger.dto('resetPassword', dto);
    const user = await this.userService.validateUser(dto);
    const salt = await bcrypt.genSalt();
    user.salt = salt;
    user.password = await bcrypt.hash(dto.passwordNew, salt);
    logger.obj('user', user);
    await this.userService.updateUser(user);

    return { 
      method: 'resetPassword',
      message: 'New password saved',
    };
  }

  public async refreshSession(
    dto: AuthDto.RefreshSession,
  ): Promise<AuthRes.RefreshSession> {
    logger.dto('refreshSession', dto);
    return { method: 'refreshSession' };
  }

  public async generatePassword() {
    const generatedPassword = PasswordGenerator.generate({
      length: UserConfig.genericPasswordLength,
      numbers: true,
      uppercase: true,
      symbols: false,
      strict: true,
    });
    return generatedPassword;
  }
}
