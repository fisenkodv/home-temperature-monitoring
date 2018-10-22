import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment';
import { MoreThan, Repository } from 'typeorm';

import * as entities from '../entity';
import * as models from '../model';

@Injectable()
export class DeviceService {
  constructor(
    @InjectRepository(entities.Device) private readonly deviceRepository: Repository<entities.Device>,
    @InjectRepository(entities.Telemetry) private readonly telemetryRepository: Repository<entities.Telemetry>,
  ) {}

  public async get(deviceUuid: string): Promise<models.Device> {
    const device = await this.deviceRepository.findOne({ where: { uuid: deviceUuid } });

    return device ? await this.toModel(device) : undefined;
  }

  public async getAll(): Promise<models.Device[]> {
    const devices = await this.deviceRepository.find();

    return await Promise.all(devices.map(x => this.toModel(x)));
  }

  private async getId(deviceUuid: string): Promise<number> {
    const device = await this.deviceRepository.findOne({ where: { uuid: deviceUuid } });
    return device.id;
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

  private async toModel(entity: entities.Device): Promise<models.Device> {
    const online = await this.isOnline(entity);
    const telemetry = await this.getLatestTelemetry(entity);
    return <models.Device>{
      uuid: entity.uuid,
      name: entity.name,
      online: online,
      temperature: telemetry.temperature,
      humidity: telemetry.humidity,
    };
  }
}
