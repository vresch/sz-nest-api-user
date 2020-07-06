import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
// --------------------------------------------------
import { PermissionSchema } from './permission.schema';
import { PermissionController } from './permission.controller';
import { PermissionService } from './permission.service';
// --------------------------------------------------

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Permission', schema: PermissionSchema },
    ]),
  ],
  exports: [
    PermissionService,
    MongooseModule.forFeature([
      { name: 'Permission', schema: PermissionSchema },
    ]),
  ],
  providers: [PermissionService],
  controllers: [PermissionController],
})
export class PermissionModule {}
