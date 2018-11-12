import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Measurement } from '@app/devices/models';
import * as moment from 'moment';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';
@Component({
  selector: 'app-measurements',
  templateUrl: './measurements.component.html',
  styleUrls: ['./measurements.component.scss'],
})
export class MeasurementsComponent implements OnInit {
  private cachedData: any = undefined;
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;
  @Input()
  set measurements(measurements: Measurement[]) {
    if (measurements && measurements.length) {
      this.lineChartLabels = measurements.map(x => moment(x.timeStamp).format('LLL'));
      this.chart.chart.config.data.labels = this.lineChartLabels;
      const temperature = measurements.map(x => x.temperature);
      const heatIndex = measurements.map(x => x.heatIndex);

      this.lineChartData = [{ data: temperature, label: 'temperature' }, { data: heatIndex, label: 'heat index' }];
    }
  }

  public lineChartData: Array<any> = [[65, 59, 80, 81, 56, 55, 40], [28, 48, 40, 19, 86, 27, 90]];
  public lineChartOptions: any = {
    responsive: true,
  };
  public lineChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  constructor() {}

  ngOnInit(): void {}
}
