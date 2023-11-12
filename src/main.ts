import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { UserNotFoundInterceptor } from './common/errors/interceptors/user-not-found.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { EmailAlreadyRegisteredInterceptor } from './common/errors/interceptors/email-already-registered.interceptor';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  // Pipes
  app.useGlobalPipes(new ValidationPipe());

  // Interceptors
  app.useGlobalInterceptors(new EmailAlreadyRegisteredInterceptor());
  app.useGlobalInterceptors(new UserNotFoundInterceptor());

  // Swagger configuration
  console.log(process.env.SWAGGER_ENABLE);
  if (!!process.env.SWAGGER_ENABLE) {
    const config = new DocumentBuilder()
      .setTitle(configService.get<string>('swagger.swaggerTitle'))
      .setDescription(configService.get<string>('swagger.swaggerDescription'))
      .setVersion(process.env.npm_package_version)
      .addBearerAuth(
        { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
        'JWT',
      )
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  }

  await app.listen(configService.get<number>('app.port'));
}

void bootstrap();
