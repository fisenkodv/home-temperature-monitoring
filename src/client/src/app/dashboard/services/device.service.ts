import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Device } from '../models';

export interface DeviceOverview {
  id: string;
  name: string;
  temperature: number;
  humidity: number;
  heatIndex: number;
}

@Injectable()
export class DeviceService {
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<Device[]> {
    return this.httpClient.get<Device[]>('/device/');
  }
}
