import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AppClusterService } from './AppCluster';

(async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
  });
  app.setGlobalPrefix('api')
  app.enableCors({
    origin: '*',
    methods: ['POST', 'PUT', 'PATCH', 'GET', 'DELETE'],
    credentials: true,
  })

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT);
})()

// AppClusterService.clusterize(bootstrap)
