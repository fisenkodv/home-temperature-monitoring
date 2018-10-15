import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Device } from 'telemetry/entity/device.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DeviceService {
  constructor(
    @InjectRepository(Device)
    private readonly deviceRepository: Repository<Device>,
  ) {}

  public async createDevice(uuid: string): Promise<Device> {
    const numberOfDevice = await this.deviceRepository.count({
      where: { uuid },
    });
    if (numberOfDevice === 0) {
      const device = new Device();
      device.uuid = uuid;
      device.isActive = true;
      device.name = 'unknown device';

      this.deviceRepository.save(device);
    }
    return await this.deviceRepository.findOne({ where: { uuid } });
  }

  public async getDevices(): Promise<Device[]> {
    return await this.deviceRepository.find();
  }
}
