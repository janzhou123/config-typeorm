import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { Coffee } from './coffee.entity';
import { Logger } from '@nestjs/common';

@Injectable()
export class CoffeeService extends TypeOrmCrudService<Coffee> {
  private readonly logger = new Logger(CoffeeService.name);
  constructor(@InjectRepository(Coffee) repo: Repository<Coffee>) {
    super(repo);
  }
}
