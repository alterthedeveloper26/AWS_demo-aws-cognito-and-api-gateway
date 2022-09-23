import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Example } from '~models/example/entity/example.entity';
import { ExampleService } from './example.service';
import { ExampleController } from './example.controller';

@Module({
  // imports: [TypeOrmModule.forFeature([Example])],
  providers: [ExampleService],
  controllers: [ExampleController]
})
export class ExampleModule {}
