import {
  Injectable,
  InternalServerErrorException,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// --------------------------------------------------
import { RoleDto, RoleRes } from './role.dto';
import { IRole } from './role.interface';
// --------------------------------------------------
import { Logger } from './../../logger';
// --------------------------------------------------
const logger = new Logger('RoleService');
// --------------------------------------------------

@Injectable()
export class RoleService {
  constructor(
    @InjectModel('Role')
    private readonly roleModel: Model<IRole.Role>,
  ) {}

  async getRoleList(dto: RoleDto.GetRoleList) {
    logger.dto('getRoleList', dto);
    return await this.roleModel.find();
  }

  async getRole(dto: RoleDto.GetRole) {
    logger.dto('getRole', dto);
    return await this.roleModel.findById(dto.id).exec();
  }

  async createRole(dto: RoleDto.CreateRole) {
    logger.dto('createRole', dto);
    const roleCreated = new this.roleModel({
      name: dto.name,
      createdAt: Date.now(),
    });
    return await roleCreated.save();
  }

  async updateRole(dto: RoleDto.UpdateRole) {
    logger.dto('updateRole', dto);
    const role = await this.getRole(dto);
    role.name = dto.name;
    return await role.save();
  }

  async deleteRole(dto: RoleDto.DeleteRole) {
    logger.dto('deleteRole', dto);
    return await this.roleModel.deleteMany({ _id: dto.id });
  }
}
