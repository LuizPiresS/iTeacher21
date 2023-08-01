import { SendEmailConfirmationInputDto } from '../dtos/send-email-confirmation-input.dto';

export interface IMailService {
  sendTenantConfirmation(data: SendEmailConfirmationInputDto): Promise<void>;
}
