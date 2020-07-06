import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PermissionModule } from './permission/permission.module';
import { RoleModule } from './role/role.module';
import { SessionModule } from './session/session.module';

@Module({
  imports: [
    AuthModule,
    PermissionModule,
    RoleModule,
    UserModule,
    SessionModule,
  ],
})
export class MsUserModule {}
