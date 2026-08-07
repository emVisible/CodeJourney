import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express'
import validate from './common/validate';
import TransformInterceptor from './Transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new validate())
  app.useGlobalInterceptors(new TransformInterceptor())
  app.setGlobalPrefix("api")
  app.useStaticAssets("uploads", { prefix: "/uploads" })
  await app.listen(3000);
}
bootstrap();