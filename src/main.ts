import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Handler } from 'aws-lambda';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import { createServer, proxy } from 'aws-serverless-express';

let cachedServer;

async function bootstrapServer() {
  const expressApp = express();
  const adapter = new ExpressAdapter(expressApp);
  const app = await NestFactory.create(AppModule, adapter);
  app.enableCors();

  app.setGlobalPrefix('dev');

  const options = new DocumentBuilder()
    .setTitle('Students API')
    .setDescription('API for managing students')
    .setVersion('1.0')
    .addApiKey({ type: 'apiKey', name: 'x-api-key', in: 'header' }, 'apiKey')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.init();
  return createServer(expressApp);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('dev');
  app.enableCors();

  const options = new DocumentBuilder()
    .setTitle('Students API')
    .setDescription('API for managing students')
    .setVersion('1.0')
    .addApiKey({ type: 'apiKey', name: 'x-api-key', in: 'header' }, 'apiKey')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}

let serverHandler: Handler;

if (process.env.IS_OFFLINE) {
  bootstrap();
} else {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  serverHandler = async (event, context, callback) => {
    if (!cachedServer) {
      cachedServer = await bootstrapServer();
    }
    return proxy(cachedServer, event, context, 'PROMISE').promise;
  };
}

export const handler = serverHandler;
