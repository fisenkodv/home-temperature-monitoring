import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as entities from '../entity';
import * as models from '../model';

@Injectable()
export class DeviceService {
  constructor(@InjectRepository(entities.Device) private readonly deviceRepository: Repository<entities.Device>) {}

  public async get(deviceUuid: string): Promise<models.Device> {
    const device = await this.deviceRepository.findOne({ where: { uuid: deviceUuid } });

    return device ? await this.toModel(device) : undefined;
  }

  public async getAll(): Promise<models.Device[]> {
    const devices = await this.deviceRepository.find();

    return await Promise.all(devices.map(x => this.toModel(x)));
  }

  private async toModel(entity: entities.Device): Promise<models.Device> {
    return <models.Device>{
      uuid: entity.uuid,
      name: entity.name,
    };
  }
}
