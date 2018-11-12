import { Component, Input, OnInit } from '@angular/core';
import { Measurement } from '@app/devices/models';
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
  view = [null, 400];

  constructor() {}

  ngOnInit(): void {}

  getData() {
    if (!this.measurements || !this.measurements.length) {
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
            name: new Date(x.timeStamp),
          };
        }),
      },
      // {
      //   name: 'Humidity',
      //   series: this.measurements.map(x => {
      //     return { value: x.humidity, name: moment(x.timeStamp).format('LLL') };
      //   }),
      // },
      // {
      //   name: 'Heat Index',
      //   series: this.measurements.map(x => {
      //     return {
      //       value: x.heatIndex,
      //       name: moment(x.timeStamp).format('LLL'),
      //     };
      //   }),
      // },
    ];

    return this.cachedData;
  }
}
