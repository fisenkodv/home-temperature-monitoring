import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { MeasurementDto } from './dto';

@Injectable()
export class MeasurementsService {
  constructor(private httpClient: HttpClient) {}

  getLatestMeasurement(deviceUuid: string): Observable<MeasurementDto> {
    return this.httpClient.get<MeasurementDto>(`/measurements/${deviceUuid}`);
  }
}
