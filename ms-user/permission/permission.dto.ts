import * as fv from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
// --------------------------------------------------

export namespace PermissionDto {
  export class GetPermissionList {}
  export class GetPermission {
    @ApiModelProperty({ example: '5d87e66aa632c57c8108de25' })
    id: string;
  }
  export class CreatePermission {
    @ApiModelProperty({ example: '/ms-user/role/getRoleList' })
    method: string;
  }
  export class UpdatePermission {
    @ApiModelProperty({ example: '5d87e66aa632c57c8108de25' })
    id: string;
    @ApiModelProperty({ example: '/ms-user/role/getRoleList' })
    method: string;
  }
  export class DeletePermission {
    @ApiModelProperty({ example: '5d87e66aa632c57c8108de25' })
    id: string;
  }
}

export namespace PermissionRes {
  export class GetPermissionList {}
  export class GetPermission {}
  export class CreatePermission {}
  export class UpdatePermission {}
  export class DeletePermission {}
}
