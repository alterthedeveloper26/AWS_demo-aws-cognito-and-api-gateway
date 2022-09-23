import { Module } from '@nestjs/common';
import { AwsService } from './aws.service';
import { AwsController } from './aws.controller';
import { HttpModule } from '@nestjs/axios';

const AWS_GET_ID_URL =
  'https://no-hosted-ui.auth.ap-northeast-1.amazoncognito.com';
//https://no-hosted-ui.auth.ap-northeast-1.amazoncognito.com

@Module({
  imports: [HttpModule],
  providers: [
    AwsService,
    {
      provide: 'AWS_GET_ID_URL',
      useValue: AWS_GET_ID_URL
    }
  ],
  controllers: [AwsController]
})
export class AwsModule {}
