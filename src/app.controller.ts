import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('获取数据配置信息')
export class AppController {
  constructor(private readonly configService: ConfigService) {}

  @Get('config')
  // @ApiOperation({ description: '获取数据配置信息' })
  getConfig(): any {
    const config = this.configService.get('db');
    return config;
  }
}
