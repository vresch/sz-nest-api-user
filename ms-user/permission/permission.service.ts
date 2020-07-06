import {
  Injectable,
  InternalServerErrorException,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// --------------------------------------------------
import { PermissionDto, PermissionRes } from './permission.dto';
import { IPermission } from './permission.interface';
// --------------------------------------------------
import { Logger } from './../../logger';
// --------------------------------------------------
const logger = new Logger('PermissionService');
// --------------------------------------------------

@Injectable()
export class PermissionService {
  constructor(
    @InjectModel('Permission')
    private readonly permissionModel: Model<IPermission.Permission>,
  ) {}

  async getPermissionList(dto: PermissionDto.GetPermissionList) {
    logger.dto('getPermissionList', dto);
    return await this.permissionModel.find();
  }

  async getPermission(dto: PermissionDto.GetPermission) {
    logger.dto('getPermission', dto);
    return await this.permissionModel.findById(dto.id).exec();
  }

  async createPermission(dto: PermissionDto.CreatePermission) {
    logger.dto('createPermission', dto);
    const permissionCreated = new this.permissionModel({
      method: dto.method,
      createdAt: Date.now(),
    });
    return await permissionCreated.save();
  }

  async updatePermission(dto: PermissionDto.UpdatePermission) {
    logger.dto('updatePermission', dto);
    const permission = await this.getPermission(dto);
    permission.method = dto.method;
    return await permission.save();
  }

  async deletePermission(dto: PermissionDto.DeletePermission) {
    logger.dto('deletePermission', dto);
    return await this.permissionModel.deleteMany({ _id: dto.id });
  }
}
