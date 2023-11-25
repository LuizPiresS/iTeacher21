import { Module } from '@nestjs/common';
import { TenantsService } from './domain/tenants.service';
import { PrismaClient } from '@prisma/client';
import { TenantsRepository } from './domain/repositories/tenants.repository';
import { TenantsController } from './presentation/controllers/tenants.controller';
import { LoggerModule } from '../../common/loggers/logger.module';
import { HashingService } from '../../common/hashing/domain/hashing.service';
import { HashingModule } from '../../common/hashing/hashing.module';
import { LoggerService } from '../../common/loggers/domain/logger.service';
import { MailService } from '../../common/mail/domain/mail.service';
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
