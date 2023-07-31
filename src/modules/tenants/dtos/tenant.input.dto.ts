import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TenantInputDto {
  @ApiProperty({ description: 'Name', example: 'Random Random' })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'User email that will be used to login',
    example: 'random@random.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description:
      'The password must contain at least one uppercase letter, one special character and one number and be made up of at least 8 characters.',
    example: 'R@nd0mP@ssw0rd',
  })
  @IsString()
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  @IsString()
  @IsOptional()
  token?: string;

  @IsOptional()
  @IsString()
  validated?: boolean;
}
