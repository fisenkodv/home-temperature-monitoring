import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Measurement } from '@app/devices/models';
import { MeasurementsService } from '@app/devices/services';
import { Store } from '@ngxs/store';
import { LoadDevice } from '@app/devices/store/devices.actions';

@Component({
  selector: 'app-device-page',
  templateUrl: './device-page.component.html',
  styleUrls: ['./device-page.component.scss'],
})
export class DevicePageComponent implements OnInit {
  measurements: Measurement[];

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const deviceUuid = this.route.snapshot.paramMap.get('uuid');
    this.store.dispatch(new LoadDevice(deviceUuid));

    // this.measurementsService
    //   .getMeasurements(deviceUuid, 24)
    //   .pipe(tap(measurements => (this.measurements = measurements)))
    //   //finalize(() => (this.isLoading = false)),
    //   .subscribe();
  }
}
