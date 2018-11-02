import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Measurement } from '@app/dashboard/models';
import { MeasurementsService } from '@app/dashboard/services';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss'],
})
export class DeviceComponent implements OnInit {
  measurements: Measurement[];

  constructor(
    private measurementsService: MeasurementsService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const deviceUuid = this.route.snapshot.paramMap.get('uuid');
    this.measurementsService
      .getMeasurements(deviceUuid, 24)
      .pipe(tap(measurements => (this.measurements = measurements)))
      //finalize(() => (this.isLoading = false)),
      .subscribe();
  }
}
