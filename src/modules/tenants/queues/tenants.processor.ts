import { Process, Processor } from '@nestjs/bull';
import { Inject } from '@nestjs/common';
import { ILoggerService } from '../../../common/loggers/domain/interfaces/logger-service.interface';
import { IMailService } from '../../../common/mail/domain/interfaces/mail.service.interface';
import { Job } from 'bull';
import { TenantSendValidationEmailEvent } from '../../../common/events/tenant-send-validation-email.event';
import { ITenantsProcessor } from './interfaces/tenants.processor.interface';

@Processor('tenants')
export class TenantsProcessor implements ITenantsProcessor {
  constructor(
    @Inject('ILoggerService')
    private readonly logger: ILoggerService,
    @Inject('IMailService')
    private readonly mailService: IMailService,
  ) {
    this.logger.contextName = TenantsProcessor.name;
  }

  @Process('tenant.send.validation.email')
  async sendValidationEmail({ data }: Job<TenantSendValidationEmailEvent>) {
    await this.mailService.sendTenantConfirmation({
      name: data.name,
      email: data.email,
      token: data.token,
    });

    this.logger.info('email enviado');
  }
}
