import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Device, DeviceDto } from '../../devices/models';

@Injectable()
export class DeviceService {
  constructor(private httpClient: HttpClient) {}

  getDevices(isActive: boolean): Observable<Device[]> {
    return this.httpClient
      .get<DeviceDto[]>(`/devices?active=${isActive}`)
      .pipe(map(devices => devices.map(Device.fromDto)));
  }

  getDevice(deviceUuid: string): Observable<Device> {
    return this.httpClient.get<DeviceDto>(`/devices/${deviceUuid}`).pipe(map(Device.fromDto));
  }

  saveSettings(devices: Device[]) {
    return this.httpClient.post('/devices', devices.map(DeviceDto.fromModel));
  }
}
