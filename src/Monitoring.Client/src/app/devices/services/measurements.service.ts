import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Measurement } from '../models';
import { MeasurementDto } from './dto';

@Injectable()
export class MeasurementsService {
  constructor(private httpClient: HttpClient) {}

  getLatestMeasurement(deviceUuid: string): Observable<Measurement> {
    return this.httpClient
      .get<MeasurementDto>(`/measurements/${deviceUuid}`)
      .pipe(map(Measurement.fromDto));
  }

  getMeasurements(
    deviceUuid: string,
    hours: number,
  ): Observable<Measurement[]> {
    return this.httpClient
      .get<MeasurementDto[]>(`/measurements/${deviceUuid}/${hours}`)
      .pipe(map(measurements => measurements.map(Measurement.fromDto)));
  }
}
