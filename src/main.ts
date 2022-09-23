import '../env';

import { HttpStatus, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { ConfigService } from '@nestjs/config';
import { AppModule } from '~/app.module';
import { PRODUCTION } from '~common/constants/environments';
import { NewrelicInterceptor } from '~common/interceptor/newrelic.interceptor';
import { TransformInterceptor } from '~common/interceptor/transform.interceptor';

// import { LoggingInterceptor } from '~common/interceptor/logging.interceptor';
// import { TransformInterceptor } from '~common/interceptor/transform.interceptor';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  const serverConfig = configService.get('serverConfig');

  if (process.env.NODE_ENV !== PRODUCTION) {
    const options = new DocumentBuilder()
      .setTitle('Example Swagger')
      .setDescription('Example Swagger')
      .setVersion('1.0')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          in: 'header'
        },
        'jwt'
      )
      .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('swagger', app, document);
  }

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
    })
  );
  // const httpAdapter = app.get(HttpAdapterHost);
  // Don't need to use transform interceptor in private services
  app.useGlobalInterceptors(new TransformInterceptor());
  // app.useGlobalFilters(new ExceptionsFilter(httpAdapter));
  app.useGlobalInterceptors(new NewrelicInterceptor());
  await app.listen(serverConfig.port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${serverConfig.port}`
  );
}

bootstrap();
