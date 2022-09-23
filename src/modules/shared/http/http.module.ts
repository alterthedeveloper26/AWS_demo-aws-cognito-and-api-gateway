import { HttpModule as BuiltInHttpModule } from '@nestjs/axios';
import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// import { httpServiceConfig } from '~/config';
import { InternalApiService } from '~shared/http/internal-api.service';

@Global()
@Module({})
export class HttpModule {
  public static register(serviceName: string, baseUrl: string): DynamicModule {
    return {
      module: HttpModule,
      imports: [
        BuiltInHttpModule.registerAsync({
          useFactory: async (configService: ConfigService) => ({
            timeout: configService.get<number>('httpServiceConfig.timeout'),
            baseURL: baseUrl
          }),
          inject: [ConfigService]
        })
      ],
      providers: [
        {
          provide: serviceName,
          useExisting: InternalApiService,
          useClass: InternalApiService
        }
      ],
      exports: [serviceName]
    };
  }
}
