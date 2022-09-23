import { Module } from '@nestjs/common';
import { CatModule } from '~/modules/cat/cat.module';
import { ExampleModule } from '~models/example/example.module';

@Module({
  imports: [ExampleModule, CatModule]
})
export class ModelsModule {}
