import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DeviceOverview {
  id: string;
  name: string;
  temperature: number;
  humidity: number;
  heatIndex: number;
}

@Injectable()
export class TemperatureService {
  constructor(private httpClient: HttpClient) {}

  getRandomQuote(): Observable<string> {
    return this.httpClient
      .cache(true)
      .get('')
      .pipe(
        map((body: any) => body.value),
        catchError(() => of('Error, could not load joke :-(')),
      );
  }
}
