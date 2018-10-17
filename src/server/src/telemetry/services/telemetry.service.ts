import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment';
import { Repository } from 'typeorm';

import * as entities from '../entity';
import { DeviceService } from './device.service';

@Injectable()
export class TelemetryService {
  private deviceMap: Map<string, number> = new Map<string, number>();

  constructor(
    @InjectRepository(entities.Telemetry) private readonly telemetryRepository: Repository<entities.Telemetry>,
    private readonly deviceService: DeviceService,
  ) {}

  public async log(deviceUuid: string, humidity: number, temperature: number, heatIndex: number) {
    const id = await this.getDeviceId(deviceUuid);
    const telemetry = <entities.Telemetry>{
      device: { id: id },
      temperature: temperature,
      humidity: humidity,
      heatIndex: heatIndex,
      timeStamp: new Date(
        moment()
          .utc()
          .format(),
      ),
    };
    await this.telemetryRepository.save(telemetry);
  }

  private async getDeviceId(deviceUuid: string): Promise<number> {
    let id = this.deviceMap.get(deviceUuid);
    if (id === undefined) {
      id = (await this.deviceService.exists(deviceUuid))
        ? await this.deviceService.getId(deviceUuid)
        : await this.deviceService.create(deviceUuid);

      this.deviceMap.set(deviceUuid, id);
    }

    return id;
  }
}
