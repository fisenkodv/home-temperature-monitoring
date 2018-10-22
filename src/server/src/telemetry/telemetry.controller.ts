import { Body, Controller, Post, Get, Param } from '@nestjs/common';

import { CreateTelemetry, DeviceTelemetry } from './model';
import { TelemetryService } from './services';

@Controller('api/telemetry')
export class TelemetryController {
  constructor(private readonly telemetryService: TelemetryService) {}

  @Post()
  public log(@Body() telemetry: CreateTelemetry) {
    this.telemetryService.logTelemetry(telemetry.deviceUuid, telemetry.humidity, telemetry.temperature);
  }

  @Get(':id')
  get(@Param('id') deviceUuid: string): Promise<DeviceTelemetry> {
    return this.telemetryService.getDeviceTelemetry(deviceUuid);
  }
}
