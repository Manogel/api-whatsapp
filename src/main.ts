import { getAsyncAppConfig } from '@config/app';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfig = getAsyncAppConfig();
  const PORT = '4000';

  await app.listen(PORT, () => {
    console.log(`🚀 App is running on port ${PORT}`);
  });
}
bootstrap();
