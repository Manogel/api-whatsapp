import { getAsyncAppConfig } from '@config/app';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfig = getAsyncAppConfig();
  // Deixei uma variavel ambiente como melhoria
  const PORT = appConfig.port;
  const swaggerOptions = new DocumentBuilder()
    .setTitle(process.env.APP_NAME)
    .setDescription(`The ${process.env.APP_NAME} API description`)
    .setVersion(process.env.APP_VERSION)
    .build();

  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('docs', app, document);
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  await app.listen(PORT, () => {
    console.log(`🚀 App is running on port ${PORT}`);
  });
}
bootstrap();
