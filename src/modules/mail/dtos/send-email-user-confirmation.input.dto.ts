import { IsEmail, IsString } from 'class-validator';

export class SendEmailUserConfirmationInputDto {
  @IsString()
  readonly name: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  readonly token: string;
}
