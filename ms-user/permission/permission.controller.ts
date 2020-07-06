import {
  Controller,
  Post,
  Body,
  ValidationPipe,
} from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
// --------------------------------------------------
import { PermissionService } from './permission.service';
import { PermissionDto, PermissionRes } from './permission.dto';
// --------------------------------------------------
import { Logger } from './../../logger';
// --------------------------------------------------
const logger = new Logger('PermissionController');
// --------------------------------------------------

@ApiUseTags('permission')
@Controller('ms-user/permission')
export class PermissionController {
  constructor(
    private readonly permissionService: PermissionService,
  ) {}

  @Post('getPermissionList')
  async getPermissionList(
    @Body(ValidationPipe) dto: PermissionDto.GetPermissionList,
  ): Promise<PermissionRes.GetPermissionList> {
    logger.method('getPermissionList');
    return await this.permissionService.getPermissionList(dto);
  }

  @Post('getPermission')
  async getPermission(
    @Body(ValidationPipe) dto: PermissionDto.GetPermission,
  ): Promise<PermissionRes.GetPermission> {
    logger.method('getPermission');
    return await this.permissionService.getPermission(dto);
  }

  @Post('createPermission')
  async createPermission(
    @Body(ValidationPipe) dto: PermissionDto.CreatePermission,
  ): Promise<PermissionRes.CreatePermission> {
    logger.method('createPermission');
    return await this.permissionService.createPermission(dto);
  }

  @Post('updatePermission')
  async updatePermission(
    @Body(ValidationPipe) dto: PermissionDto.UpdatePermission,
  ): Promise<PermissionRes.UpdatePermission> {
    logger.method('updatePermission');
    return await this.permissionService.updatePermission(dto);
  }

  @Post('deletePermission')
  async deletePermission(
    @Body(ValidationPipe) dto: PermissionDto.DeletePermission,
  ): Promise<PermissionRes.DeletePermission> {
    logger.method('deletePermission');
    return await this.permissionService.deletePermission(dto);
  }
}
