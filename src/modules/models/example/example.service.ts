import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository, Like } from 'typeorm';
import { UpdateDataDto } from './dto/update-data.dto';
import { GetListExampleDto } from './dto/get-list-example.dto';
import { ApiResponse } from '../../../base/base.response';
import { CreateDataDto } from './dto/create-data.dto';
import { Example } from '~models/example/entity/example.entity';
import { generatePagination } from '~common/utils/pagination.util';
import { getAllColumnKeys } from '~common/utils/get-all-column-keys.util';

import { DATA_NOT_FOUND_ERR } from '~common/constants/messages';
// import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ExampleService {
  constructor() {} // private readonly exampleRepository: Repository<Example> // @InjectRepository(Example)

  async functionA() {
    return {
      message: 'function A'
    };
  }

  async functionB() {
    return {
      message: 'function B'
    };
  }

  async functionC() {
    return {
      message: 'function C'
    };
  }

  //   async postSomething(body: CreateDataDto) {
  //     // handle logic here
  //     await this.exampleRepository.save(body);
  //     return {
  //       success: true
  //     };
  //   }

  //   async getSomething(
  //     queryParams: GetListExampleDto
  //   ): Promise<ApiResponse<Example[]>> {
  //     const { page, pageSize, sortKey, sortType, someField } = queryParams;
  //     const queryWhere = someField ? { someField: Like(`%${someField}%`) } : {};

  //     const [total, result] = await Promise.all([
  //       this.exampleRepository.count({
  //         ...queryWhere
  //       }),
  //       this.exampleRepository.find({
  //         where: {
  //           ...queryWhere
  //         },
  //         ...generatePagination({
  //           page,
  //           pageSize,
  //           sortKey,
  //           sortType
  //         }),
  //         select: [
  //           ...getAllColumnKeys<Example>(this.exampleRepository, [
  //             'createdBy',
  //             'modifiedBy'
  //           ])
  //         ]
  //       })
  //     ]);

  //     return {
  //       success: true,
  //       result,
  //       pagination: {
  //         ...queryParams,
  //         total,
  //         totalPages: Math.ceil(total / pageSize)
  //       }
  //     };
  //   }

  //   async updateData(body: UpdateDataDto, id: string) {
  //     const record = this.exampleRepository.findOne({
  //       id
  //     });
  //     if (!record) {
  //       throw new BadRequestException({
  //         message: DATA_NOT_FOUND_ERR
  //       });
  //     }
  //     const result = await this.exampleRepository.save({
  //       ...body,
  //       id
  //     });
  //     return {
  //       success: true,
  //       result
  //     };
  //   }
}
