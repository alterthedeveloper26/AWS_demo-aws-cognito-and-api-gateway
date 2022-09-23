import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  ValidationPipe
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiResponse } from '../../../base/base.response';
import { CreateDataDto } from './dto/create-data.dto';
import { UpdateDataDto, ValidateUUIDParam } from './dto/update-data.dto';
import { GetListExampleDto } from './dto/get-list-example.dto';
import { ExampleService } from '~models/example/example.service';
import { ApiResponseSchema } from '~common/decorator/api-response.decorator';
import { Example } from '~models/example/entity/example.entity';

@ApiTags('Alphabet')
@Controller('Alphabet')
export class ExampleController {
  constructor(protected readonly exampleService: ExampleService) {}

  // @Post('')
  // @ApiResponseSchema()
  // async postSomething(@Body() body: CreateDataDto): Promise<ApiResponse> {
  //   return this.exampleService.postSomething(body);
  // }

  @Get('a')
  @ApiResponseSchema()
  async getA(): Promise<any> {
    return this.exampleService.functionA();
  }

  @Get('b')
  @ApiResponseSchema()
  async getB(): Promise<any> {
    return this.exampleService.functionB();
  }

  @Get('c')
  @ApiResponseSchema()
  async getC(): Promise<any> {
    return this.exampleService.functionC();
  }

  // @Get('/list')
  // @ApiResponseSchema()
  // async getSomething(
  //   @Query(
  //     new ValidationPipe({
  //       forbidNonWhitelisted: true,
  //       whitelist: true
  //     })
  //   )
  //   query: GetListExampleDto
  // ): Promise<ApiResponse<Example[]>> {
  //   const queryParams: GetListExampleDto = {
  //     someField: query?.someField,
  //     pageSize: query?.pageSize || 10,
  //     sortKey: query?.sortKey || 'someField',
  //     sortType: query?.sortType
  //   };
  //   return this.exampleService.getSomething(queryParams);
  // }

  // @Put(':id')
  // @ApiResponseSchema()
  // async updateData(
  //   @Body() body: UpdateDataDto,
  //   @Param() params: ValidateUUIDParam
  // ): Promise<ApiResponse> {
  //   return this.exampleService.updateData(body, params.id);
  // }
}
