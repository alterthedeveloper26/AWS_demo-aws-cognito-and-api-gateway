import { IsOptional } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { BasePaginationRequest } from '~base/base-pagination.request';

export class GetListExampleDto extends BasePaginationRequest {
  @ApiProperty({
    required: false
  })
  @IsOptional()
  someField: string;
}
