import { Inject, Injectable } from '@nestjs/common';
import { TenantsRepository } from '../repositories/tenants.repository';
import { TenantInputDto } from '../dtos/tenant.input.dto';
import { EmailAlreadyRegisteredError } from '../../../common/errors/types/email-already-registered.error';
import { IHashingService } from '../../hashing/services/interfaces/hashing-service.interface';
import { ILoggerService } from '../../logger/services/interfaces/logger-service.interface';
import { ConfigService } from '@nestjs/config';
import { IMailService } from '../../mail/services/interfaces/mail.service.interface';
import { ITenantsRepository } from '../repositories/interfaces/tenants.repository.interface';

@Injectable()
export class TenantsService {
  constructor(
    @Inject('ITenantsRepository')
    private readonly tenantRepository: ITenantsRepository,
    @Inject('IHashingService')
    private readonly hashingService: IHashingService,
    @Inject('ILoggerService')
    private readonly logger: ILoggerService,
    @Inject('IMailService')
    private readonly mailService: IMailService,
    private readonly configService: ConfigService,
  ) {}

  async createTenant(input: TenantInputDto) {
    const existingTenant = await this.tenantRepository.findByEmail(input.email);
    if (existingTenant) {
      this.logger.contextName = `${TenantsService.name}.createTenant`;
      this.logger.error('This tenant is already registered in the system');
      throw new EmailAlreadyRegisteredError();
    }

    const hashedPassword = await this.hashingService.hashingPassword(
      input.password,
      +this.configService.get<number>('SALT'),
    );

    return this.tenantRepository.create({ ...input, password: hashedPassword });
  }
}
