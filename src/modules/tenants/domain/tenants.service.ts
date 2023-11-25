import { Inject, Injectable } from '@nestjs/common';
import { TenantInputDto } from '../presentation/dtos/tenant.input.dto';
import { EmailAlreadyRegisteredError } from '../../../common/errors/types/email-already-registered.error';
import { IHashingService } from '../../../common/hashing/domain/interfaces/hashing-service.interface';
import { ILoggerService } from '../../../common/loggers/domain/interfaces/logger-service.interface';
import { ConfigService } from '@nestjs/config';
import { ITenantsRepository } from './interfaces/tenants.repository.interface';
import { ITenantsQueue } from '../queues/interfaces/tenants.queue.interface';

@Injectable()
export class TenantsService {
  constructor(
    @Inject('ITenantsRepository')
    private readonly tenantRepository: ITenantsRepository,
    @Inject('IHashingService')
    private readonly hashingService: IHashingService,
    @Inject('ILoggerService')
    private readonly logger: ILoggerService,
    @Inject('ITenantsQueue')
    private readonly tenantsQueue: ITenantsQueue,
    private readonly configService: ConfigService,
  ) {}

  async createTenant(input: TenantInputDto) {
    const existingTenant = await this.tenantRepository.findByEmail(input.email);
    if (existingTenant) {
      this.logger.contextName = `${TenantsService.name}.createTenant`;
      this.logger.error('This tenant is already registered in the system');
      throw new EmailAlreadyRegisteredError();
    }

    const token = await this.generateToken();

    await this.tenantsQueue.tenantSendValidationEmail(
      input.name,
      input.email,
      token,
    );

    const hashedPassword = await this.hashingService.hashingPassword(
      input.password,
      +this.configService.get<number>('SALT'),
    );

    return this.tenantRepository.create({
      ...input,
      password: hashedPassword,
      token: token,
      validated: false,
    });
  }

  /**
   * Generates token for email validation
   * @returns string
   * @private
   */
  private async generateToken(): Promise<string> {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }
}
