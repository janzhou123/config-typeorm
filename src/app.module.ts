import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeeModule } from './coffee/coffee.module';
import { CoffeeController } from './coffee/coffee.controller';
import { LoggerModule } from 'nestjs-pino';
import {
  loggerOptions,
  typeOrmConfigAsync,
  configuration,
} from './configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    LoggerModule.forRoot(loggerOptions),
    CoffeeModule,
  ],
  controllers: [AppController, CoffeeController],
  providers: [AppService],
})
export class AppModule {}
