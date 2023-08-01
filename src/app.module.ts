import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from './common/config/env.validation';
import { HashingModule } from './common/hashing/hashing.module';
import { LoggerModule } from './common/loggers/logger.module';
import { PrismaService } from './common/prisma/prisma.service';
import { TenantsModule } from './modules/tenants/tenants.module';
import { MailModule } from './common/mail/mail.module';
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
