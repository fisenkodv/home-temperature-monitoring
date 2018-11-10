import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Logger } from '@app/core';
import * as moment from 'moment';
import { EMPTY, Subject, timer, Observable } from 'rxjs';
import { catchError, takeUntil, tap } from 'rxjs/operators';

import { Device, Measurement } from '../../models';
import { MeasurementsService } from '../../services';
import { Store } from '@ngxs/store';
import { DevicesState } from '@app/devices/store/devices.state';

const logger = new Logger('Device');

@Component({
  selector: 'app-device-card',
  templateUrl: './device-card.component.html',
  styleUrls: ['./device-card.component.scss'],
})
export class DeviceCardComponent implements OnInit, OnDestroy {
  measurement$: Observable<Measurement>;

  @Input()
  device: Device;

  constructor(private store: Store) {}

  ngOnInit() {
    this.measurement$ = this.store.select(
      DevicesState.measurement(this.device.uuid)
    );
  }

  ngOnDestroy(): void {}

  private isOnline(measurement: Measurement): boolean {
    return moment.utc().diff(moment(measurement.timeStamp).utc(), 'minutes') === 0;
  }
}
