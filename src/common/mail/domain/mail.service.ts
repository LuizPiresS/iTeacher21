import { ConfigService } from '@nestjs/config';
import { SendEmailConfirmationInputDto } from './dtos/send-email-confirmation-input.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { IMailService } from './interfaces/mail.service.interface';

@Injectable()
export class MailService implements IMailService {
  constructor(
    private mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  public async sendTenantConfirmation(
    input: SendEmailConfirmationInputDto,
  ): Promise<void> {
    try {
      const url = await this.generateValidationUrl(input.email, input.token);

      await this.mailerService.sendMail({
        to: input.email,
        // from: '"Support Team" <support@example.com>', // override default from
        subject: this.configService.get<string>('TENANT_MAIL_SUBJECT'),
        template: '../templates/confirmation.tenant.mail.hbs', // `.hbs` extension is appended automatically
        context: {
          // ✏️ filling curly brackets with content
          name: input.name,
          url,
        },
      });
    } catch (e) {
      console.error(e.message);
    }
  }

  private async generateValidationUrl(
    email: string,
    token: string,
  ): Promise<string> {
    return `${this.configService.get<string>(
      'BASE_URL',
    )}:${this.configService.get<string>('APP_PORT')}/users/${token}/${email}`;
  }
}
