import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Telemetry } from 'telemetry/entity/telemetry.entity';
import { Repository } from 'typeorm';

import { DeviceService } from './device.service';

@Injectable()
export class TelemetryService {
  constructor(
    @InjectRepository(Telemetry)
    private readonly telemetryRepository: Repository<Telemetry>,
    private readonly deviceService: DeviceService,
  ) {}

  public async log(
    deviceUuid: string,
    temperature: number,
    humidity: number,
    heatIndex: number,
  ) {
    const device = await this.deviceService.createDevice(deviceUuid);
    const telemetry = new Telemetry();
    telemetry.device = device;
    telemetry.temperature = temperature;
    telemetry.humidity = humidity;
    telemetry.heat_index = heatIndex;
    telemetry.time_stamp = new Date();
    await this.telemetryRepository.save(telemetry);
  }
}
