import { SendEmailUserConfirmationInputDto } from '../../dtos/send-email-user-confirmation.input.dto';

export interface IMailService {
  sendUserConfirmation(data: SendEmailUserConfirmationInputDto): Promise<void>;
}
