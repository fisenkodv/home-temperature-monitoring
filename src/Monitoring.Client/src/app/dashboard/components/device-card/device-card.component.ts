import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Logger } from '@app/core';
import * as moment from 'moment';
import { EMPTY, Subject, timer } from 'rxjs';
import { catchError, takeUntil, tap } from 'rxjs/operators';

import { Device, Measurement } from '../../models';
import { MeasurementsService } from '../../services';

const logger = new Logger('Device');

@Component({
  selector: 'app-device-card',
  templateUrl: './device-card.component.html',
  styleUrls: ['./device-card.component.scss'],
})
export class DeviceCardComponent implements OnInit, OnDestroy {
  private FetchInterval = 10000;
  private unsubscribe: Subject<void> = new Subject();

  loading: boolean;
  online: boolean;
  measurement: Measurement;

  @Input()
  device: Device;

  constructor(private measurementsService: MeasurementsService) {}

  ngOnInit() {
    this.loading = true;

    const source = timer(0, this.FetchInterval);
    source.pipe(takeUntil(this.unsubscribe)).subscribe(() => {
      this.measurementsService
        .getLatestMeasurement(this.device.uuid)
        .pipe(
          tap(result => {
            this.measurement = result;
            this.online = this.isOnline(result.timeStamp);
            this.loading = false;
          }),
          catchError(error => {
            logger.error(
              `Unable to retrieve measurement data from: ${this.device.uuid}`,
            );
            return EMPTY;
          }),
        )
        .subscribe();
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  private isOnline(timeStamp: Date): boolean {
    return moment.utc().diff(moment(timeStamp).utc(), 'minutes') === 0;
  }
}
