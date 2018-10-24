import { FastifyAdapter, NestFactory } from '@nestjs/core';
import * as path from 'path';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new FastifyAdapter());
  app.useStaticAssets({ root: path.resolve(path.join(__dirname, '..', 'public')) });

  await app.listen(process.env.PORT || 3000, '0.0.0.0');
}
bootstrap();
