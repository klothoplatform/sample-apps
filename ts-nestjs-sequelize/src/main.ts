
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import * as express from 'express';

async function bootstrap() {
  const expressApp = express();
  const app = await NestFactory.create<NestExpressApplication>(AppModule, new ExpressAdapter(expressApp));
  await app.init();

  /* @klotho::expose {
   *   id = "UsersGateway"
   *   target = "public"
   * }
   */
  await app.listen(3000);
  return expressApp;
}
const nestApp = bootstrap();
