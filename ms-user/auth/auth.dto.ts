import * as fv from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
// --------------------------------------------------
import { ISession } from '../session';
// --------------------------------------------------

const authValidation = {
  email: {
    minLength: 6,
    maxLength: 50,
    Matches: {
      regExp: new RegExp('(.+)'),
      message: 'Email is not valid',
    },
  },
  password: {
    minLength: 8,
    maxLength: 50,
    Matches: {
      regExp: new RegExp('(.+)'),
      message: 'Password too weak',
    },
  },
};
// --------------------------------------------------

export namespace AuthDto {
  export class SignUp {
    @fv.IsString()
    @fv.MinLength(authValidation.email.minLength)
    @fv.MaxLength(authValidation.email.maxLength)
    @fv.Matches(
      authValidation.email.Matches.regExp,
      authValidation.email.Matches.message,
    )
    @ApiModelProperty({ example: 'test@test.com' })
    email: string;

    @fv.IsString()
    @fv.MinLength(authValidation.password.minLength)
    @fv.MaxLength(authValidation.password.maxLength)
    @fv.Matches(
      authValidation.password.Matches.regExp,
      authValidation.password.Matches.message,
    )
    @ApiModelProperty({ example: '1234567890' })
    password: string;
  }

  export class Login extends SignUp {}

  export class ResetPassword extends SignUp {
    @fv.IsString()
    @fv.MinLength(authValidation.password.minLength)
    @fv.MaxLength(authValidation.password.maxLength)
    @fv.Matches(
      authValidation.password.Matches.regExp,
      authValidation.password.Matches.message,
    )
    @ApiModelProperty({ example: '1234567890' })
    passwordNew: string;
  }

  export class ForgotPassword {
    @fv.IsString()
    @fv.MinLength(authValidation.email.minLength)
    @fv.MaxLength(authValidation.email.maxLength)
    @fv.Matches(
      authValidation.email.Matches.regExp,
      authValidation.email.Matches.message,
    )
    @ApiModelProperty({ example: 'test@test.com' })
    email: string;
  }

  export class Logout {}
  export class RefreshSession {}
}
// --------------------------------------------------

export namespace AuthRes {
  export class SignUp extends ISession.Session {}
  export class Login {}
  export class ResetPassword {}
  export class ForgotPassword {
    method: string;
    message: string;
  }
  export class Logout {}
  export class RefreshSession {}
}
