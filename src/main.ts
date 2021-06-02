import { getAsyncAppConfig } from '@config/app';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfig = getAsyncAppConfig();
  // Deixei uma variavel ambiente como melhoria
  const PORT = appConfig.port;
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  await app.listen(PORT, () => {
    console.log(`🚀 App is running on port ${PORT}`);
  });
}
bootstrap();
