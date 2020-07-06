import {
  Controller,
  Post,
  Body,
  ValidationPipe,
} from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
// --------------------------------------------------
import { RoleService } from './role.service';
import { RoleDto, RoleRes } from './role.dto';
// --------------------------------------------------
import { Logger } from './../../logger';
// --------------------------------------------------
const logger = new Logger('RoleController');
// --------------------------------------------------

@ApiUseTags('role')
@Controller('ms-user/role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post('getRoleList')
  async getRoleList(
    @Body(ValidationPipe) dto: RoleDto.GetRoleList,
  ): Promise<RoleRes.GetRoleList> {
    logger.method('getRoleList');
    return await this.roleService.getRoleList(dto);
  }

  @Post('getRole')
  async getRole(
    @Body(ValidationPipe) dto: RoleDto.GetRole,
  ): Promise<RoleRes.GetRole> {
    logger.method('getRole');
    return await this.roleService.getRole(dto);
  }

  @Post('createRole')
  async createRole(
    @Body(ValidationPipe) dto: RoleDto.CreateRole,
  ): Promise<RoleRes.CreateRole> {
    logger.method('createRole');
    return await this.roleService.createRole(dto);
  }

  @Post('updateRole')
  async updateRole(
    @Body(ValidationPipe) dto: RoleDto.UpdateRole,
  ): Promise<RoleRes.UpdateRole> {
    logger.method('updateRole');
    return await this.roleService.updateRole(dto);
  }

  @Post('deleteRole')
  async deleteRole(
    @Body(ValidationPipe) dto: RoleDto.DeleteRole,
  ): Promise<RoleRes.DeleteRole> {
    logger.method('deleteRole');
    return await this.roleService.deleteRole(dto);
  }
}
