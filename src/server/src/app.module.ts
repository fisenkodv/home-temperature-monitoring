import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { TelemetryModule } from './telemetry/telemetry.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      keepConnectionAlive: true,
      type: 'mysql',
      host: '192.168.1.2',
      port: 3307,
      username: 'monitoring',
      password: 'RXPzUvp3Bgm78oBx',
      database: 'monitoring',
      synchronize: true,
      entities: [__dirname + '/**/**.entity{.ts,.js}'],
      migrations: [__dirname + '/migration/**/*.ts'],
      subscribers: [__dirname + '/subscriber/**/*.ts'],
      logging: ['error'],
    }),
    TelemetryModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
