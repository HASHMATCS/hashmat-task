import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { HttpException } from './exceptions/HttpException';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.useGlobalFilters(HttpException());
  await app.listen(3000);
}
bootstrap();
