import { Module } from '@nestjs/common';
import { TenantsService } from './services/tenants.service';
import { PrismaClient } from '@prisma/client';
import { TenantsRepository } from './repositories/tenants.repository';
import { TenantsController } from './controllers/tenants.controller';
import { LoggerModule } from '../logger/logger.module';
import { HashingService } from '../hashing/services/hashing.service';
import { HashingModule } from '../hashing/hashing.module';
import { LoggerService } from '../logger/services/logger.service';
import { MailService } from '../mail/services/mail.service';
import { BullModule } from '@nestjs/bull';
import { TenantsProcessor } from './queues/tenants.processor';
import { TenantsQueue } from './queues/tenants.queue';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'tenants',
    }),
    LoggerModule,
    HashingModule,
  ],
  providers: [
    TenantsService,
    PrismaClient,
    { provide: 'ITenantsRepository', useClass: TenantsRepository },
    { provide: 'IHashingService', useClass: HashingService },
    { provide: 'ILoggerService', useClass: LoggerService },
    { provide: 'IMailService', useClass: MailService },
    { provide: 'ITenantsProcessor', useClass: TenantsProcessor },
    { provide: 'ITenantsQueue', useClass: TenantsQueue },
  ],
  controllers: [TenantsController],
})
export class TenantsModule {}
