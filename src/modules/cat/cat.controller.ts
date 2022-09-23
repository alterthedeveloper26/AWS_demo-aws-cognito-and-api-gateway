import { Body, Controller, Get, Headers, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiResponseSchema } from '~common/decorator/api-response.decorator';
import { CatService } from '~/modules/cat/cat.service';

@ApiTags('cat')
@Controller('cat')
export class CatController {
  constructor(protected readonly exampleService: CatService) {}

  @Get('a')
  @ApiResponseSchema()
  async getA(): Promise<any> {
    return this.exampleService.catA();
  }

  @Get('b')
  @ApiResponseSchema()
  async getB(): Promise<any> {
    return this.exampleService.catB();
  }

  @Get('c')
  @ApiResponseSchema()
  async getC(): Promise<any> {
    return this.exampleService.catC();
  }

  @Get('receive')
  @ApiResponseSchema()
  async receive(
    @Body() req,
    @Headers() header,
    @Query('code') code,
    @Query('id_token') token
  ): Promise<any> {
    // console.log(header);
    console.log(code, token);
    req.code = code;
    req.token = token;
    return this.exampleService.logRequestBody(req);
  }
}
