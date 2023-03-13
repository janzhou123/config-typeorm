import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';

export default class TypeOrmConfig {
  static getOrmConfig(configService: ConfigService): TypeOrmModuleOptions {
    return {
      type: 'mysql', //数据库类型
      host: configService.get<string>('db.mysql1.dbHost'), //数据库地址
      port: configService.get<number>('db.mysql1.dbPort') || 3306, //端口，默认3306
      username: configService.get<string>('db.mysql1.dbUser'), //用户名
      password: configService.get<string>('db.mysql1.dbPwd'), //密码
      database: configService.get<string>('db.mysql1.dbBase'), //数据库名称
      retryDelay: 500, // 重试连接数据库间隔
      retryAttempts: 10, // 允许重连次数
      entities: [__dirname + '/../**/*.entity{.ts,.js}'], //扫描根目录下的所有entity文件
      synchronize: configService.get<boolean>('db.mysql1.synchronize') || false, //是否自动同步数据结构到数据库， 这个参数正式环境一定要设置成false,默认 false
    };
  }
}

export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: (configService: ConfigService): TypeOrmModuleOptions =>
    TypeOrmConfig.getOrmConfig(configService),
  inject: [ConfigService],
};
