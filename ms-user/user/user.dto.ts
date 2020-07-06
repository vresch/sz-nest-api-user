import * as fv from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
// --------------------------------------------------

export namespace UserDto {
  export class GetUserList {}
  export class GetUser {
    @ApiModelProperty({ example: '5d87e66aa632c57c8108de25' })
    id: string;
  }
  export class GetUserByEmail {
    @ApiModelProperty({ example: 'test@test.com' })
    email: string;
  }
  export class CreateUser {
    email: string;
    password: string;
  }
  export class UpdateUser {
    id?: string;
    email?: string;
    password?: string;
    salt?: string;
  }
  export class DeleteUser {
    @ApiModelProperty({ example: '5d87e66aa632c57c8108de25' })
    id: string;
  }
  export class ValidateUser {
    email: string;
    password: string;
  }
}

export namespace UserRes {
  export class GetUserList {}
  export class GetUser {}
  export class CreateUser {}
  export class UpdateUser {}
  export class DeleteUser {}
}
