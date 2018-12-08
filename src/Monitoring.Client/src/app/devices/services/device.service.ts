import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Device } from '../models';

@Injectable()
export class DeviceService {
  constructor(private httpClient: HttpClient) {}

  getDevices(isActive: boolean): Observable<Device[]> {
    return this.httpClient.get<Device[]>(`/devices?active=${isActive}`);
  }

  getDevice(deviceUuid: string): Observable<Device> {
    return this.httpClient.get<Device>(`/devices/${deviceUuid}`);
  }
}
