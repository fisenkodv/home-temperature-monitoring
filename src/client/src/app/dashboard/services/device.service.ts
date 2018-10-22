import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Device } from '../models';

@Injectable()
export class DeviceService {
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<Device[]> {
    return this.httpClient.get<Device[]>('/device/');
  }
}
