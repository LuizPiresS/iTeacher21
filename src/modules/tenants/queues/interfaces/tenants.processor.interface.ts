import { Job } from 'bull';
import { TenantSendValidationEmailEvent } from '../../../../common/events/tenant-send-validation-email.event';

export interface ITenantsProcessor {
  sendValidationEmail({
    data,
  }: Job<TenantSendValidationEmailEvent>): Promise<void>;
}
