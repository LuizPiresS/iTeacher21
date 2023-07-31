import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from './config/env.validation';
import { HashingModule } from './modules/hashing/hashing.module';
import { LoggerModule } from './modules/logger/logger.module';
import { PrismaService } from './prisma/prisma.service';
import { TenantsModule } from './modules/tenants/tenants.module';
import { MailModule } from './modules/mail/mail.module';
import { BullModule } from '@nestjs/bull';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot({
      validate,
      isGlobal: true,
    }),
    LoggerModule,
    HashingModule,
    TenantsModule,
    MailModule,
    BullModule.forRoot({
      redis: {
        host: 'redis',
        port: 6379,
      },
    }),
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
