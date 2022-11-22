import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initSwagger } from './app.swagger';
import * as fs from 'fs';

const crPath = '/etc/nginx/ssl/scoutscentinelas113cali.crt';
const pkPath = '/etc/nginx/ssl/scoutscentinelas113cali.key';
const options: any = {};

if (fs.existsSync(crPath) && fs.existsSync(pkPath)) {
  options.httpsOptions = {
    cert: fs.readFileSync(crPath),
    key: fs.readFileSync(pkPath)
  }
}

async function bootstrap() {
  const server = await NestFactory.create(AppModule,options);
  const  logger = new Logger();
  server.enableCors();
  server.setGlobalPrefix('api')
  initSwagger(server);

  server.useGlobalPipes(
    new ValidationPipe({
      whitelist:true,
    })
  );
  await server.listen(process.env.SERVER_PORT);
  logger.log(`server is running in localhost:${await server.getUrl()}`);
}
bootstrap();
