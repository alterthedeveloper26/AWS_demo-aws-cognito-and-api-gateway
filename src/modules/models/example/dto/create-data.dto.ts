import { IsNotEmpty } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateDataDto {
  @ApiProperty()
  @IsNotEmpty()
  someField: string;
}
