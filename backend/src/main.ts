import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Serve React static files
  app.useStaticAssets(join(__dirname, '..', 'frontend'));
  app.setBaseViewsDir(join(__dirname, '..', 'frontend'));

  // Enable CORS for local React development
  app.enableCors({
    origin: [
            'https://countries-stabjana.onrender.com',
            'https://countries-stabjana.onrender.com:3000', 
            'https://fxiwabepasidehipxvkr.supabase.co', 
            'https://play.google.com/log?format=json&hasfast=true&authuser=0'
            ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 5001);
}
bootstrap();
