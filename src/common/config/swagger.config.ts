import { registerAs } from '@nestjs/config';

interface ISwaggerConfig {
  swaggerTitle: string;
  swaggerDescription: string;
  swaggerEnable: boolean;
}

export default registerAs(
  'swagger',
  (): Partial<ISwaggerConfig> => ({
    swaggerTitle: process.env.SWAGGER_TITLE,
    swaggerDescription: process.env.SWAGGER_DESCRIPTION,
    swaggerEnable: !!process.env.SWAGGER_ENABLE,
  }),
);
