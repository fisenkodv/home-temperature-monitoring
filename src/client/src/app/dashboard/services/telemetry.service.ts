import { Injectable } from '@angular/core';
import { DeviceTelemetry } from '../models';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TelemetryService {
  constructor(private httpClient: HttpClient) {}

  getDeviceTelemetry(deviceUuid: string): Observable<DeviceTelemetry> {
    return this.httpClient.get<DeviceTelemetry>(`/telemetry/${deviceUuid}`);
  }
}
