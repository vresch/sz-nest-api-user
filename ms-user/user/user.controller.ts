import {
  Controller,
  Post,
  Body,
  ValidationPipe,
} from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
// --------------------------------------------------
import { UserService } from './user.service';
import { UserDto, UserRes } from './user.dto';
// --------------------------------------------------
import { Logger } from './../../logger';
// --------------------------------------------------
const logger = new Logger('UserController');
// --------------------------------------------------

@ApiUseTags('user')
@Controller('ms-user/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('getUserList')
  async getUserList(
    @Body(ValidationPipe) dto: UserDto.GetUserList,
  ): Promise<UserRes.GetUserList> {
    logger.method('getUserList');
    return await this.userService.getUserList(dto);
  }

  @Post('getUser')
  async getUser(
    @Body(ValidationPipe) dto: UserDto.GetUser,
  ): Promise<UserRes.GetUser> {
    logger.method('getUser');
    return await this.userService.getUser(dto);
  }

  @Post('createUser')
  async createUser(
    @Body(ValidationPipe) dto: UserDto.CreateUser,
  ): Promise<UserRes.CreateUser> {
    logger.method('createUser');
    return await this.userService.createUser(dto);
  }

  @Post('updateUser')
  async updateUser(
    @Body(ValidationPipe) dto: UserDto.UpdateUser,
  ): Promise<UserRes.UpdateUser> {
    logger.method('updateUser');
    return await this.userService.updateUser(dto);
  }

  @Post('deleteUser')
  async deleteUser(
    @Body(ValidationPipe) dto: UserDto.DeleteUser,
  ): Promise<UserRes.DeleteUser> {
    logger.method('deleteUser');
    return await this.userService.deleteUser(dto);
  }
}
