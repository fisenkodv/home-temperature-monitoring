import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { ApplicationState } from '../../../store/app.store';
import { Device } from '../../models';
import { LoadDevices } from '../../store/devices.actions';
import { DevicesState } from '../../store/devices.state';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit {
  @Select(ApplicationState.loading)
  loading$: Observable<boolean>;

  @Select(DevicesState.devices)
  devices$: Observable<Device[]>;

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(new LoadDevices());
  }
}
