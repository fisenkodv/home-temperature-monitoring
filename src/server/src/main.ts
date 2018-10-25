import { FastifyAdapter, NestFactory } from '@nestjs/core';
import * as fs from 'fs';
import * as path from 'path';

import { AppModule } from './application/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new FastifyAdapter());
  const publicDirectory = path.resolve(path.join(__dirname, 'public'));
  if (fs.existsSync(publicDirectory)) {
    app.useStaticAssets({ root: publicDirectory });
  }
  await app.listen(process.env.APP_PORT, '0.0.0.0');
}
bootstrap();
