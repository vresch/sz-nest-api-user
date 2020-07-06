import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MailerModule } from '@nest-modules/mailer';
import { DatabaseConfig, MailerConfig } from './config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MsUserModule } from './ms-user';
import { MsCrudModule } from './ms-crud';
import { MsBillingModule } from './ms-billing';
import { MsDatabaseModule } from './ms-database/database.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      DatabaseConfig.url,
      DatabaseConfig.options,
    ),
    MailerModule.forRoot({
      transport: MailerConfig.transport,
      defaults: MailerConfig.defaults,
    }),
    MsUserModule,
    MsCrudModule,
    MsBillingModule,
    MsDatabaseModule,
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
