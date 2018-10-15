import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TelemetryModule } from 'telemetry/telemetry.module';

@Module({
  imports: [TypeOrmModule.forRoot(), TelemetryModule],
})
export class AppModule {}
