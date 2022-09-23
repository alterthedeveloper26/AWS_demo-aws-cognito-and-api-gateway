import { Body, Controller, Param, Post, Query } from '@nestjs/common';
import { AwsService } from '~/modules/aws/aws.service';
import { SignInDto } from '~/modules/aws/dto/get-account-id.dto';

@Controller('aws')
export class AwsController {
  constructor(protected readonly awsService: AwsService) {}

  @Post('login')
  getAWSAccountId(@Body() dto: SignInDto) {
    const { email, password } = dto;
    return this.awsService.signIn(email, password);
  }

  @Post('credential')
  getCredential(@Body() dto: SignInDto) {
    return this.awsService.idkWhatIamDoing(dto);
  }

  @Post('credential/temp')
  getTemp(@Body() dto: SignInDto) {
    return this.awsService.getTempCredential(dto);
  }

  @Post('role')
  getRoles() {
    return this.awsService.assumeRole();
  }
}
