import { Body, Controller, Post } from '@nestjs/common';

import { Telemetry } from './model';
import { TelemetryService } from './services';

@Controller('api/telemetry')
export class TelemetryController {
  constructor(private readonly telemetryService: TelemetryService) {}

  @Post()
  public log(@Body() telemetry: Telemetry) {
    this.telemetryService.log(telemetry.deviceUuid, telemetry.humidity, telemetry.temperature, telemetry.heatIndex);
  }
}
