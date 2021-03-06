import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ApplicationState } from '../../../store/app.store';
import { Device } from '../../models';
import { LoadDevices, LoadMeasurement } from '../../store/devices.actions';
import { DevicesState } from '../../store/devices.state';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements AfterViewInit, OnDestroy {
  private FetchInterval = 1_000;
  private unsubscribe: Subject<void> = new Subject();

  @Select(ApplicationState.loading)
  loading$: Observable<boolean>;

  @Select(DevicesState.devices)
  devices$: Observable<Device[]>;

  constructor(private store: Store) {
    this.store.dispatch(new LoadDevices());
  }

  ngAfterViewInit() {
    setTimeout(() => {
      timer(0, this.FetchInterval)
        .pipe(takeUntil(this.unsubscribe))
        .subscribe(() => this.store.dispatch(new LoadMeasurement()));
    });

    this.store.dispatch(new LoadMeasurement());
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  trackByDevice(device: Device) {
    return device.uuid;
  }
}
