import * as fv from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
// --------------------------------------------------

export namespace RoleDto {
  export class GetRoleList {}
  export class GetRole {
    @ApiModelProperty({ example: '5d87e66aa632c57c8108de25' })
    id: string;
  }
  export class CreateRole {
    @ApiModelProperty({ example: 'admin' })
    name: string;
  }
  export class UpdateRole {
    @ApiModelProperty({ example: '5d87e66aa632c57c8108de25' })
    id: string;
    @ApiModelProperty({ example: 'admin' })
    name: string;
  }
  export class DeleteRole {
    @ApiModelProperty({ example: '5d87e66aa632c57c8108de25' })
    id: string;
  }
}

export namespace RoleRes {
  export class GetRoleList {}
  export class GetRole {}
  export class CreateRole {}
  export class UpdateRole {}
  export class DeleteRole {}
}
