import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { validate } from './config/env.validation';
import { HashingModule } from './modules/hashing/hashing.module';
import { LoggerModule } from './modules/logger/logger.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
      isGlobal: true,
    }),
    LoggerModule,
    HashingModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
