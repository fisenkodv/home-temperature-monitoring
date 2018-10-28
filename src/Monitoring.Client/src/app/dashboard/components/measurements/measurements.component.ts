import { Component, Input, OnInit } from '@angular/core';
import { Measurement } from '@app/dashboard/models';
import * as moment from 'moment';

@Component({
  selector: 'app-measurements',
  templateUrl: './measurements.component.html',
  styleUrls: ['./measurements.component.scss'],
})
export class MeasurementsComponent implements OnInit {
  private cachedData: any = undefined;

  @Input()
  measurements: Measurement[] = [];
  view = [700, 400];

  constructor() {}

  ngOnInit(): void {}

  getData() {
    if (!this.measurements) {
      return [];
    }
    if (this.cachedData !== undefined) {
      return this.cachedData;
    }
    this.cachedData = [
      {
        name: 'Temperature',
        series: this.measurements.map(x => {
          return {
            value: x.temperature,
            name: moment(x.timeStamp).format('LLL'),
          };
        }),
      },
      {
        name: 'Humidity',
        series: this.measurements.map(x => {
          return { value: x.humidity, name: moment(x.timeStamp).format('LLL') };
        }),
      },
      {
        name: 'Heat Index',
        series: this.measurements.map(x => {
          return {
            value: x.heatIndex,
            name: moment(x.timeStamp).format('LLL'),
          };
        }),
      },
    ];

    return this.cachedData;
  }
}
