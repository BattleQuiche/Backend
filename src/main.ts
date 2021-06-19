import { NestFactory } from '@nestjs/core';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import config from './config';

const useSwagger = (app: INestApplication) => {
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Quiches Wars Api Documentation')
    .setDescription('The Quiches Wars offcial API documentation')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('api/docs', app, document);
};

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  app.enableCors(
    {
    origin: 'http://localhost:8080',
    },
  )
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  useSwagger(app);

  await app.listen(config().port);
};
bootstrap();
