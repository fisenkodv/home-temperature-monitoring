import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Device } from 'telemetry/entity/device.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DeviceService {
  constructor(@InjectRepository(Device) private readonly deviceRepository: Repository<Device>) {}

  public async exists(deviceId: string): Promise<boolean> {
    return (
      (await this.deviceRepository.count({
        where: { uuid: deviceId },
      })) !== 0
    );
  }

  public async create(deviceId: string, isActive: boolean = true, name: string = 'unknown device'): Promise<number> {
    let device = <Device>{
      uuid: deviceId,
      isActive: isActive,
      name: name,
    };
    await this.deviceRepository.save(device);
    device = await this.deviceRepository.findOne({ where: { deviceId } });
    return device.id;
  }

  public async getAll(): Promise<Device[]> {
    return await this.deviceRepository.find();
  }
}
