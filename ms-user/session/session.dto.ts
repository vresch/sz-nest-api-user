import * as fv from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
// --------------------------------------------------

export namespace SessionDto {
  export class CreateSession {
    user: {
      _id: string;
      email: string;
    };
  }
  export class DeleteSession {}
  export class DeleteSessionList {}
  export class CheckSession {}
  export class GetSessionList {}
  export class GetSession {}
  export class UpdateSession {}
}

export namespace SessionRes {
  export class CreateSession {
    user: {
      _id: string;
    };
    accessToken: string;
  }
  export class DeleteSession {}
  export class DeleteSessionList {}
  export class CheckSession {}
  export class GetSessionList {}
  export class GetSession {}
  export class UpdateSession {}
}
