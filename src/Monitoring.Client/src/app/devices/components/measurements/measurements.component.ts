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
  public lineChartData: Array<any> = [[], []];
  public lineChartOptions: any = { responsive: true };
  public lineChartLabels: Array<string> = [];

  @ViewChild(BaseChartDirective) chart: BaseChartDirective;
  @Input()
  set measurements(measurements: Measurement[]) {
    if (measurements && measurements.length) {
      this.lineChartLabels = measurements.map(x => moment(x.timeStamp).calendar());
      this.chart.chart.config.data.labels = this.lineChartLabels;
      const temperature = measurements.map(x => x.temperature);
      const heatIndex = measurements.map(x => x.heatIndex);

      this.lineChartData = [{ data: temperature, label: 'Temperature' }, { data: heatIndex, label: 'Heat Index' }];
    }
  }

  constructor() {}

  ngOnInit(): void {}
}
