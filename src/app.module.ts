import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from './config/env.validation';
import { HashingModule } from './modules/hashing/hashing.module';
import { LoggerModule } from './modules/logger/logger.module';
import { PrismaService } from './prisma/prisma.service';
import { TenantsModule } from './modules/tenants/tenants.module';
import { MailModule } from './modules/mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
      isGlobal: true,
    }),
    LoggerModule,
    HashingModule,
    TenantsModule,
    MailModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
