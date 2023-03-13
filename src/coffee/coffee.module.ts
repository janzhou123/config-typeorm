import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeeController } from './coffee.controller';
import { Coffee } from './coffee.entity';
import { CoffeeService } from './coffee.service';

@Module({
  controllers: [CoffeeController],
  providers: [CoffeeService],
  imports: [TypeOrmModule.forFeature([Coffee])],
  exports: [CoffeeService],
})
export class CoffeeModule {}
