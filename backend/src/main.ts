import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Is line ko har haal mein yahan hona chahiye
  app.enableCors(); 
  
  await app.listen(3000);
}
bootstrap();