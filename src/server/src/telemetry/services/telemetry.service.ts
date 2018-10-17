import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Telemetry } from 'telemetry/entity/telemetry.entity';
import { Repository } from 'typeorm';

import { DeviceService } from './device.service';

@Injectable()
export class TelemetryService {
  private deviceMap: Map<string, number> = new Map<string, number>();

  constructor(
    @InjectRepository(Telemetry) private readonly telemetryRepository: Repository<Telemetry>,
    private readonly deviceService: DeviceService,
  ) {}

  public async log(deviceId: string, temperature: number, humidity: number, heatIndex: number) {
    let id = this.deviceMap.get(deviceId);
    if (id === undefined) {
      id = await this.deviceService.create(deviceId);
      this.deviceMap.set(deviceId, id);
    }
    const telemetry = <Telemetry>{
      device: { id: id },
      temperature: temperature,
      humidity: humidity,
      heatIndex: heatIndex,
      timeStamp: new Date(),
    };
    await this.telemetryRepository.save(telemetry);
  }
}
