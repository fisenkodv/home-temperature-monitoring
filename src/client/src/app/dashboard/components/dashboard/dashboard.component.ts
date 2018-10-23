import { Component, OnInit } from '@angular/core';
import { finalize, tap } from 'rxjs/operators';

import { Device } from '../../models';
import { DeviceService } from '../../services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
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
