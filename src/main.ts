import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { APPLICATION_PORT } from './common/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(APPLICATION_PORT);
}
bootstrap();
