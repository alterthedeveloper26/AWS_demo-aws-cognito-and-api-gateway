import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class UpdateDataDto {
  @ApiProperty()
  someField: string;
}
export class ValidateUUIDParam {
  @ApiProperty({
    type: 'string',
    format: 'uuid',
    required: true
  })
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
