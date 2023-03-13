import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { knife4jSetup } from 'nestjs-knife4j';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //增加 swagger配置
  const options = new DocumentBuilder()
    .setTitle('Coffee example')
    .setDescription('The Coffee API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  //增加 knife4配置
  knife4jSetup(app, {
    urls: [
      {
        name: '2.X版本',
        url: `/api-json`,
        swaggerVersion: '3.0',
        location: `/api-json`,
      },
    ],
  });
  app.useLogger(app.get(Logger));
  app.useGlobalInterceptors(new LoggerErrorInterceptor());
  await app.listen(3000);
}
bootstrap();
