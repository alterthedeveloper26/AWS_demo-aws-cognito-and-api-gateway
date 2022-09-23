import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import configuration from '~/config/configuration';
import { AwsModule } from '~/modules/aws/aws.module';

import { AuthModule } from '~auth/auth.module';
import { ExceptionsFilter } from '~common/filters/exception.filter';
import { LoggingInterceptor } from '~common/interceptor/logging.interceptor';
import { RequestContextMiddleWare } from '~common/middlewares/requestContext';
import { ModelsModule } from '~models/models.module';
import { SharedModule } from '~shared/shared.module';

@Module({
  imports: [
    ModelsModule,
    AuthModule,
    ScheduleModule.forRoot(),
    SharedModule,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      envFilePath: ['.env']
    }),
    AwsModule
  ],
  controllers: [],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
    {
      provide: APP_FILTER,
      useClass: ExceptionsFilter
    }
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(RequestContextMiddleWare)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
