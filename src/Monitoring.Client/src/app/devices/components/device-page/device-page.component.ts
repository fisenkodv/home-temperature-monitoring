import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Device, Measurement } from '@app/devices/models';
import { LoadDevice, LoadMeasurement, LoadMeasurements } from '@app/devices/store/devices.actions';
import { DevicesState } from '@app/devices/store/devices.state';
import { Store } from '@ngxs/store';
import { Observable, Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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

    setTimeout(() => {
      this.store.dispatch(new LoadDevice(deviceUuid));
      this.store.dispatch(new LoadMeasurements(deviceUuid, 24));
      timer(0, this.FetchInterval)
        .pipe(takeUntil(this.unsubscribe))
        .subscribe(() => this.store.dispatch(new LoadMeasurement()));
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
