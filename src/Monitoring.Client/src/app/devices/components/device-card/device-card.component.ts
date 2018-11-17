import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Logger } from '@app/core';
import { DevicesState } from '@app/devices/store/devices.state';
import { Store } from '@ngxs/store';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import { Device, Measurement } from '../../models';

const logger = new Logger('Device');

@Component({
  selector: 'app-device-card',
  templateUrl: './device-card.component.html',
  styleUrls: ['./device-card.component.scss'],
})
export class DeviceCardComponent implements OnInit, OnDestroy {
  private unsubscribe: Subject<void> = new Subject();

  measurement: Measurement;

  @Input()
  device: Device;

  constructor(private store: Store) {}

  ngOnInit() {
    this.store
      .select(DevicesState.measurement(this.device.uuid))
      .pipe(
        takeUntil(this.unsubscribe),
        tap(measurement => (this.measurement = measurement))
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  public get hasData() {
    return this.measurement;
  }

  private isOnline(): boolean {
    if (!this.hasData) {
      return false;
    } else {
      const utcNow = moment.utc();
      const measurementTimeStamp = moment(this.measurement.timeStamp).utc();
      const diff = utcNow.diff(measurementTimeStamp, 'minutes');

      return diff < 2;
    }
  }
}
