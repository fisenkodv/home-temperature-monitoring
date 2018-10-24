import { Controller, Get, Param } from '@nestjs/common';

import { Device } from './model';
import { DeviceService } from './services';

@Controller('/api/device')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @Get(':id')
  get(@Param('id') deviceUuid: string): Promise<Device> {
    return this.deviceService.get(deviceUuid);
  }

  @Get()
  getAll(): Promise<Device[]> {
    return this.deviceService.getAll();
  }
}
