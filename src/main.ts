import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  APPLICATION_PORT,
  AWS_ACCESS_KEY,
  AWS_KEY_ID,
  AWS_REGION,
} from './common/constants';
import { config } from 'aws-sdk';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  config.update({
    accessKeyId: AWS_KEY_ID,
    secretAccessKey: AWS_ACCESS_KEY,
    region: AWS_REGION,
  });

  await app.listen(APPLICATION_PORT);
}
bootstrap();
