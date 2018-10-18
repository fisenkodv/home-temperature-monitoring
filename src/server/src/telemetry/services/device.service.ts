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

  public async getId(deviceUuid: string): Promise<number> {
    const device = await this.deviceRepository.findOne({ where: { uuid: deviceUuid } });
    return device.id;
  }

  public async getAll(): Promise<models.Device[]> {
    const devices = await this.deviceRepository.find();

    return await Promise.all(devices.map(x => this.toModel(x)));
  }

  private async isOnline(deviceUuid: string): Promise<boolean> {
    const numberOfLogItems = await this.telemetryRepository.count({
      where: {
        deviceId: deviceUuid,
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

  private async toModel(entity: entities.Device): Promise<models.Device> {
    const online = await this.isOnline(entity.uuid);
    return <models.Device>{ uuid: entity.uuid, name: entity.name, online: online };
  }
}
