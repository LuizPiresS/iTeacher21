import { ITenantsQueue } from './interfaces/tenants.queue.interface';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { TenantSendValidationEmailEvent } from '../../../common/events/tenant-send-validation-email.event';

export class TenantsQueue implements ITenantsQueue {
  constructor(
    @InjectQueue('tenants') private readonly tenantsQueue: Queue,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async tenantSendValidationEmail(
    name: string,
    email: string,
    token: string,
  ): Promise<void> {
    this.eventEmitter.emit(
      'tenant.send.validation.email',
      new TenantSendValidationEmailEvent(name, email, token),
    );
    await this.tenantsQueue.add(
      'tenant.send.validation.email',
      new TenantSendValidationEmailEvent(name, email, token),
    );
  }
}
