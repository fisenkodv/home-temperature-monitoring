import { Component, OnInit } from '@angular/core';
import { finalize, tap } from 'rxjs/operators';

import { Device } from '../../models';
import { DeviceService } from '../../services';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit {
  isLoading: boolean;
  devices: Device[] = [];

  constructor(private deviceService: DeviceService) {}

  ngOnInit() {
    this.isLoading = true;

    this.deviceService
      .getAll()
      .pipe(
        tap(devices => (this.devices = devices)),
        finalize(() => (this.isLoading = false)),
      )
      .subscribe();
  }
}
