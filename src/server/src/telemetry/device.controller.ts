import { Controller, Get } from '@nestjs/common';

import { Device } from './entity/device.entity';
import { DeviceService } from './services';

@Controller('api/device')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @Get()
  getDevices(): Promise<Device[]> {
    return this.deviceService.getAll();
  }
}
