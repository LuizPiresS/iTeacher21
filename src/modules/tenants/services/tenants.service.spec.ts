import { Test, TestingModule } from '@nestjs/testing';
import { TenantsService } from './tenants.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerService } from '../../logger/services/logger.service';
import { LoggerModule } from '../../logger/logger.module';
import { HashingModule } from '../../hashing/hashing.module';
import { PrismaService } from '../../../prisma/prisma.service';
import { EmailAlreadyRegisteredError } from '../../../common/errors/types/email-already-registered.error';
import { IHashingService } from '../../hashing/services/interfaces/hashing-service.interface';

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

describe('TenantsService', () => {
  let service: TenantsService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TenantsService,
        ConfigService,
        PrismaService,
        {
          provide: 'IHashingService',
          useValue: hashingServiceMock,
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
