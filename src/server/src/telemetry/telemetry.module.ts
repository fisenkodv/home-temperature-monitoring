import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DeviceController } from './device.controller';
import { Device } from './entity/device.entity';
import { Telemetry } from './entity/telemetry.entity';
import { DeviceService, TelemetryService, TemperatureService } from './services';
import { TelemetryController } from './telemetry.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Device, Telemetry])],
  controllers: [DeviceController, TelemetryController],
  providers: [DeviceService, TelemetryService, TemperatureService],
})
export class TelemetryModule {}
