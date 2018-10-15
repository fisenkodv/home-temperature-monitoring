import { Controller, Post, Body } from '@nestjs/common';
import { CreateTelemetryDto } from './dto/create-telemetry.dto';
import { TelemetryService } from './services';

@Controller('api/telemetry')
export class TelemetryController {
  constructor(private readonly telemetryService: TelemetryService) {}

  @Post()
  public async log(@Body() createTelemetryDto: CreateTelemetryDto) {
    this.telemetryService.log(
      createTelemetryDto.deviceUuid,
      createTelemetryDto.temperature,
      createTelemetryDto.humidity,
      createTelemetryDto.heatIndex,
    );
  }
}
