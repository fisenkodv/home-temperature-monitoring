import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, timer, Subject } from 'rxjs';

import { ApplicationState } from '../../../store/app.store';
import { Device } from '../../models';
import { LoadDevices, LoadMeasurement } from '../../store/devices.actions';
import { DevicesState } from '../../store/devices.state';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit {
  private FetchInterval = 10000;
  private unsubscribe: Subject<void> = new Subject();

  @Select(ApplicationState.loading)
  loading$: Observable<boolean>;

  @Select(DevicesState.devices)
  devices$: Observable<Device[]>;

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(new LoadDevices());

    const source = timer(0, this.FetchInterval);
    source
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => this.store.dispatch(new LoadMeasurement()));
  }
}
