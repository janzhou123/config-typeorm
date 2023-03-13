import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';
import * as _ from 'lodash';
import { ConfigFactory } from '@nestjs/config';

// 公共配置文件名称
const YML_COMMON_CONFIG_FILENAME = 'config.yml';
// 公共配置文件路径
const filePath = join(__dirname, '../../config', YML_COMMON_CONFIG_FILENAME);
// 根据启动命令中配置的环境变量，获取对应的环境配置文件路径
const envPath = join(
  __dirname,
  '../../config',
  `config.${process.env.NODE_ENV || `development`}.yml`,
);
//读取公共配置内容,并使用yml进行加载
const commonConfig = yaml.load(readFileSync(filePath, 'utf8'));
//获取对应的环境配置内容
const envConfig = yaml.load(readFileSync(envPath, 'utf8'));

export const configuration = (): ConfigFactory => {
  //讲读取的配置文件内容进行合并返回
  return _.merge(commonConfig, envConfig);
};
