import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from 'configs/swagger';
import { TransformResponseInterceptor } from 'common/interceptors/TransformResponseInterceptor';
import { ValidationPipe } from '@nestjs/common';
import * as morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors();

  // Add Morgan logger middleware
  app.use(morgan('tiny'));

  // Swagger setup
  setupSwagger(app);

  // Interceptors
  app.useGlobalInterceptors(new TransformResponseInterceptor());

  // Validator
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT || 3000);
  console.log(`Server is running on http://localhost:${process.env.PORT || 3000}/swagger`);
}
bootstrap();
