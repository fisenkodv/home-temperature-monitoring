import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment';
import { Repository } from 'typeorm';

import * as entities from '../entity';

@Injectable()
export class TelemetryService {
  private deviceMap: Map<string, number> = new Map<string, number>();

  constructor(
    @InjectRepository(entities.Telemetry) private readonly telemetryRepository: Repository<entities.Telemetry>,
    @InjectRepository(entities.Device) private readonly deviceRepository: Repository<entities.Device>,
  ) {}

  public async log(deviceUuid: string, humidity: number, temperature: number, heatIndex: number) {
    const id = await this.getDeviceId(deviceUuid);
    const telemetry = <entities.Telemetry>{
      device: { id: id },
      temperature: temperature,
      humidity: humidity,
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
      let device = await this.deviceRepository.findOne({
        where: { uuid: deviceUuid },
      });

      if (device) {
        id = device.id;
      } else {
        device = <entities.Device>{ uuid: deviceUuid, isActive: true, name: 'unknown device' };
        device = await this.deviceRepository.save(device);
        id = device.id;
      }

      this.deviceMap.set(deviceUuid, id);
    }

    return id;
  }
}
