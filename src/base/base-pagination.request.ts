import { Transform } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsPositive } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { PaginationSortingTypeEnum } from '~common/constants/etc';

export class BasePaginationRequest {
  @ApiProperty({
    type: 'number',
    default: 1,
    required: false
  })
  @IsOptional()
  @Transform((params) => parseInt(params.value, 10))
  @IsInt()
  @IsPositive()
  page?: number = 1;

  @ApiProperty({
    type: 'number',
    default: 10,
    required: false
  })
  @IsOptional()
  @Transform((params) => parseInt(params.value, 10))
  @IsInt()
  @IsPositive()
  pageSize?: number;

  @ApiProperty({
    type: 'string',
    required: false
  })
  sortKey?: string;

  @ApiProperty({
    type: 'enum',
    enum: PaginationSortingTypeEnum,
    default: PaginationSortingTypeEnum.ASCENDING,
    required: false
  })
  @IsOptional()
  @IsEnum(PaginationSortingTypeEnum)
  sortType?: PaginationSortingTypeEnum;
}
