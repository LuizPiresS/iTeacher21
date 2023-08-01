import { Test, TestingModule } from '@nestjs/testing';
import { TenantsService } from './tenants.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerService } from '../../../common/loggers/domain/logger.service';
import { LoggerModule } from '../../../common/loggers/logger.module';
import { HashingModule } from '../../../common/hashing/hashing.module';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { EmailAlreadyRegisteredError } from '../../../common/errors/types/email-already-registered.error';
import { IHashingService } from '../../../common/hashing/domain/interfaces/hashing-service.interface';
import { TenantsProcessor } from '../queues/tenants.processor';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ITenantsQueue } from '../queues/interfaces/tenants.queue.interface';
import { MailService } from '../../../common/mail/domain/mail.service';
import { MailerService } from '@nestjs-modules/mailer';

export const tenantsRepositoryMock = {
  create: jest.fn(),
  findById: jest.fn(),
  findByEmail: jest.fn(),
  findAll: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

export const hashingServiceMock: IHashingService = {
  hashingPassword: jest.fn(),
};

export const tenantsQueueMock: ITenantsQueue = {
  tenantSendValidationEmail: jest.fn(),
};

export class MailerServiceMock {
  async sendMail(mailOptions: any): Promise<any> {
    return Promise.resolve();
  }
}

describe('TenantsService', () => {
  let service: TenantsService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TenantsService,
        ConfigService,
        PrismaService,
        TenantsProcessor,
        EventEmitter2,

        {
          provide: 'IHashingService',
          useValue: hashingServiceMock,
        },

        {
          provide: MailerService,
          useClass: MailerServiceMock, // Aqui, usamos useClass para fornecer o mock em vez do serviço real.
        },
        {
          provide: 'IMailService',
          useClass: MailService,
        },

        {
          provide: 'ILoggerService',
          useFactory: () => {
            const loggerService = new LoggerService(new ConfigService());
            loggerService.info = jest.fn().mockResolvedValue({});
            loggerService.error = jest.fn().mockResolvedValue({});
            return loggerService;
          },
        },

        { provide: 'ITenantsRepository', useValue: tenantsRepositoryMock },
        { provide: 'ITenantsQueue', useValue: tenantsQueueMock },
      ],
      imports: [LoggerModule, ConfigModule, HashingModule],
    }).compile();

    service = module.get<TenantsService>(TenantsService);
  });

  describe('# defined', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });
  });

  describe('# createTenant', () => {
    const input = {
      email: 'random@random.com',
      name: 'Random Name',
      password: 'password',
    };
    it('should create a new tenant', async () => {
      tenantsRepositoryMock.create.mockResolvedValue({});

      const result = await service.createTenant(input);

      expect(tenantsRepositoryMock.findByEmail).toHaveBeenCalledTimes(1);
      expect(hashingServiceMock.hashingPassword).toHaveBeenCalledTimes(1);
      expect(tenantsQueueMock.tenantSendValidationEmail).toHaveBeenCalledTimes(
        1,
      );
      expect(result).toEqual({});
    });

    it('not should be created a new tenant if tenant already registered', async () => {
      tenantsRepositoryMock.create.mockResolvedValue({});
      tenantsRepositoryMock.findByEmail.mockResolvedValue({});

      expect(tenantsRepositoryMock.findByEmail).toHaveBeenCalledTimes(1);
      await expect(service.createTenant(input)).rejects.toThrow(
        new EmailAlreadyRegisteredError(),
      );
    });
  });
});
