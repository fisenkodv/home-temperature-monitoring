import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, timer, EMPTY } from 'rxjs';
import { takeUntil, catchError, tap } from 'rxjs/operators';

import { Device, DeviceTelemetry } from '../models';
import { TelemetryService } from '../services';
import { Logger } from '@app/core';

const logger = new Logger('Device');

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss'],
})
export class DeviceComponent implements OnInit, OnDestroy {
  private unsubscribe: Subject<void> = new Subject();

  loading: boolean;

  telemetry: DeviceTelemetry;

  @Input()
  device: Device;

  constructor(private telemetryService: TelemetryService) {}

  ngOnInit() {
    this.loading = true;

    const source = timer(0, 2000);
    source.pipe(takeUntil(this.unsubscribe)).subscribe(() => {
      this.telemetryService
        .getDeviceTelemetry(this.device.uuid)
        .pipe(
          tap(result => {
            this.telemetry = result;
            this.loading = false;
          }),
          catchError(error => {
            logger.error(
              `Unable to retrieve telemetry data from: ${this.device.uuid}`,
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
}
