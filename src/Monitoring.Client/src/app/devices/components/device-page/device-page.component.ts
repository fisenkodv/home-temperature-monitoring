import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap, takeUntil } from 'rxjs/operators';
import { Measurement, Device } from '@app/devices/models';
import { MeasurementsService } from '@app/devices/services';
import { Store } from '@ngxs/store';
import { LoadDevice, LoadMeasurement, LoadMeasurements } from '@app/devices/store/devices.actions';
import { Observable, timer, Subject } from 'rxjs';
import { DevicesState } from '@app/devices/store/devices.state';

@Component({
  selector: 'app-device-page',
  templateUrl: './device-page.component.html',
  styleUrls: ['./device-page.component.scss'],
})
export class DevicePageComponent implements OnInit, OnDestroy {
  private FetchInterval = 10000;
  private unsubscribe: Subject<void> = new Subject();

  device$: Observable<Device>;
  measurement$: Observable<Measurement>;
  measurements$: Observable<Measurement[]>;

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const deviceUuid = this.route.snapshot.paramMap.get('uuid');

    this.device$ = this.store.select(DevicesState.device(deviceUuid));
    this.measurement$ = this.store.select(DevicesState.measurement(deviceUuid));
    this.measurements$ = this.store.select(DevicesState.measurements(deviceUuid));

    this.store.dispatch(new LoadDevice(deviceUuid));
    this.store.dispatch(new LoadMeasurements(deviceUuid, 24));
    timer(0, this.FetchInterval)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => this.store.dispatch(new LoadMeasurement()));

    // this.measurementsService
    //   .getMeasurements(deviceUuid, 24)
    //   .pipe(tap(measurements => (this.measurements = measurements)))
    //   //finalize(() => (this.isLoading = false)),
    //   .subscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
