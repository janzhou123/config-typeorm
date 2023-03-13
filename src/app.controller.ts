import { Controller, Get, HttpException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('获取数据配置信息')
export class AppController {
  constructor(private readonly configService: ConfigService) {}

  @Get('config')
  @ApiOperation({
    summary: '获取数据配置信息',
    description: '获取数据配置信息',
  })
  getConfig() {
    const config = this.configService.get('db');
    return config;
  }

  @Get('error')
  @ApiOperation({
    summary: '主动报错',
    description: '主动报错',
  })
  getError() {
    throw new HttpException('我出错了！', 500);
  }
}
