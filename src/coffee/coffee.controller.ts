import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { Coffee } from './coffee.entity';
import { CoffeeService } from './coffee.service';

@Crud({
  model: {
    type: Coffee,
  },
})
@Controller('coffee')
@ApiTags('coffee')
export class CoffeeController implements CrudController<Coffee> {
  constructor(public service: CoffeeService) {}

  @ApiOperation({
    summary: 'Get all coffee',
    description: '使用find()方法，获取所有咖啡数据',
  })
  @Get('/all-coffee')
  getAllCoffees(): any {
    return this.service.find();
  }
}
