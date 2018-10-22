import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment';
import { DeviceTelemetry } from 'telemetry/model';
import { MoreThan, Repository } from 'typeorm';

import * as entities from '../entity';
import { TemperatureService } from './temperature.service';

@Injectable()
export class TelemetryService {
  private deviceMap: Map<string, number> = new Map<string, number>();

  constructor(
    @InjectRepository(entities.Telemetry) private readonly telemetryRepository: Repository<entities.Telemetry>,
    @InjectRepository(entities.Device) private readonly deviceRepository: Repository<entities.Device>,
    private temperatureService: TemperatureService,
  ) {}

  public async logTelemetry(deviceUuid: string, humidity: number, temperature: number) {
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

  public async getDeviceTelemetry(deviceUuid: string): Promise<DeviceTelemetry> {
    const device = await this.deviceRepository.findOne({ where: { uuid: deviceUuid } });
    const online = await this.isOnline(device);
    const telemetry = await this.getLatestTelemetry(device);

    return <DeviceTelemetry>{
      online: online,
      temperature: telemetry.temperature,
      humidity: telemetry.humidity,
      heatIndex: this.temperatureService.getHeatIndex(telemetry.humidity, telemetry.temperature),
    };
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

  private async isOnline(entity: entities.Device): Promise<boolean> {
    const numberOfLogItems = await this.telemetryRepository.count({
      where: {
        deviceId: entity.uuid,
        timeStamp: MoreThan(
          new Date(
            moment()
              .utc()
              .subtract(1, 'minute')
              .format(),
          ),
        ),
      },
    });

    return numberOfLogItems > 0;
  }

  private async getLatestTelemetry(entity: entities.Device): Promise<entities.Telemetry> {
    return await this.telemetryRepository.findOne({
      where: {
        device: { id: entity.id },
      },
      order: {
        timeStamp: 'DESC',
      },
    });
  }
}
