import { Module } from '@nestjs/common';
import { CatController } from '~/modules/cat/cat.controller';
import { CatService } from '~/modules/cat/cat.service';

@Module({
  imports: [],
  providers: [CatService],
  controllers: [CatController]
})
export class CatModule {}
