import type { Request } from 'express';
import type { IncomingMessage } from 'http';
import type { Params } from 'nestjs-pino';
import { multistream } from 'pino';
import type { ReqId } from 'pino-http';

const passUrl = new Set(['/health', '/graphql']);

export const loggerOptions: Params = {
  pinoHttp: [
    {
      timestamp: () => `,"time":"${new Date(Date.now()).toISOString()}"`,
      quietReqLogger: true,
      genReqId: (req: IncomingMessage): ReqId =>
        (<Request>req).header('X-Request-Id'),
      ...(process.env.NODE_ENV === 'production'
        ? {}
        : {
            level: 'debug',
            // https://github.com/pinojs/pino-pretty
            transport: {
              target: 'pino-pretty',
              options: { sync: true },
            },
          }),
      autoLogging: {
        ignore: (req: IncomingMessage) =>
          passUrl.has((<Request>req).originalUrl),
      },
      customAttributeKeys: {
        req: '请求信息',
        res: '响应信息',
        err: '错误信息',
        responseTime: '响应时间(ms)',
      },
      level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
      serializers: {
        req(req: {
          httpVersion: any;
          raw: { httpVersion: any; params: any; query: any; body: any };
          params: any;
          query: any;
          body: any;
        }) {
          req.httpVersion = req.raw.httpVersion;
          req.params = req.raw.params;
          req.query = req.raw.query;
          req.body = req.raw.body;
          return req;
        },
        err(err: {
          params: any;
          raw: { params: any; query: any; body: any };
          query: any;
          body: any;
        }) {
          err.params = err.raw.params;
          err.query = err.raw.query;
          err.body = err.raw.body;
          return err;
        },
      },
    },
    multistream(
      [
        // https://getpino.io/#/docs/help?id=log-to-different-streams
        { level: 'debug', stream: process.stdout },
        { level: 'error', stream: process.stderr },
        { level: 'fatal', stream: process.stderr },
      ],
      { dedupe: true },
    ),
  ],
};
