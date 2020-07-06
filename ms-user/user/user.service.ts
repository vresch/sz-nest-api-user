import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
// --------------------------------------------------
import { UserDto, UserRes } from './user.dto';
import { IUser } from './user.interface';
import { UserException } from './user.exception';
// --------------------------------------------------
import { Logger } from './../../logger';
import { DatabaseCode } from './../../config';
// --------------------------------------------------
const logger = new Logger('UserService');
// --------------------------------------------------

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<IUser.User>,
  ) {}

  async getUserList(dto: UserDto.GetUserList) {
    logger.dto('getUserList', dto);
    return await this.userModel.find();
  }

  async getUser(dto: UserDto.GetUser) {
    logger.dto('getUser', dto);
    return await this.userModel.findById(dto.id).exec();
  }

  async createUser(dto: UserDto.CreateUser): Promise<IUser.User> {
    logger.dto('createUser', dto);
    const { email, password } = dto;
    const user = new this.userModel({ email, password });
    const salt = await bcrypt.genSalt();
    user.password = await this.hashPassword({ password, salt });
    user.salt = salt;
    try {
      await user.save();
    } catch (error) {
      if (error.code === DatabaseCode.duplicateKey) {
        UserException.userDuplicateEmail();
      }
      logger.error(error);
      UserException.userCreationAborted();
    }
    return user;
  }

  async updateUser(dto: UserDto.UpdateUser) {
    logger.dto('updateUser', dto);
    try {
      await this.userModel.updateOne({ _id: dto.id }, dto);
    } catch (error) {
      logger.error(error);
      UserException.userUpdateAborted();
    }
    return {
      method: 'updateUser',
      dto,
    };
  }

  async deleteUser(dto: UserDto.DeleteUser) {
    logger.dto('deleteUser', dto);
    return await this.userModel.deleteMany({ _id: dto.id });
  }

  async validateUser(dto: UserDto.ValidateUser): Promise<IUser.User> {
    logger.dto('validateUser', dto);
    const { email, password } = dto;
    const user: IUser.User = await this.userModel.findOne({ email });
    if (!user) {
      UserException.userNotFound();
    }
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      return user;
    }
    UserException.userPasswordNotValid();
  }

  async findUserByEmail(dto: UserDto.GetUserByEmail): Promise<IUser.User> {
    const user = await this.userModel.findOne({ email: dto.email });
    if (!user) {
      UserException.userNotFound();
    }
    return user;
  }

  private async hashPassword({ password, salt }): Promise<string> {
    logger.dto('hashPassword', { password, salt });
    return await bcrypt.hash(password, salt);
  }
}
