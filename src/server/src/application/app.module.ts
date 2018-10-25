import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from 'nestjs-config';
import * as path from 'path';

import { TelemetryModule } from '../telemetry/telemetry.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.load(),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const config = {
          ...configService.get('database'),
          keepConnectionAlive: true,
          synchronize: false,
          entities: [path.resolve(path.join(__dirname, '..', '/**/**.entity{.ts,.js}'))],
          migrations: [__dirname + '/migration/**/*.ts'],
          subscribers: [__dirname + '/subscriber/**/*.ts'],
          logging: ['error'],
        };
        return config;
      },
      inject: [ConfigService],
    }),
    TelemetryModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
