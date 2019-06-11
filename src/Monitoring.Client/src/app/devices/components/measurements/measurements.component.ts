import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Measurement } from '@app/devices/models';
import * as moment from 'moment';
import { BaseChartDirective, Label } from 'ng2-charts';
import { ChartDataSets, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-measurements',
  templateUrl: './measurements.component.html',
  styleUrls: ['./measurements.component.scss'],
})
export class MeasurementsComponent {
  public lineChartData: ChartDataSets[] = [{ data: [], label: 'Temperature' }, { data: [], label: 'Heat Index' }];
  public lineChartOptions: ChartOptions = { responsive: true };
  public lineChartLabels: Label[] = [];

  @ViewChild(BaseChartDirective, { static: false }) chart: BaseChartDirective;

  @Input()
  set measurements(measurements: Measurement[]) {
    if (measurements && measurements.length) {
      this.lineChartLabels = measurements.map(x => moment(x.timeStamp).calendar());
      const temperature = measurements.map(x => x.temperature);
      const heatIndex = measurements.map(x => x.heatIndex);

      this.lineChartData[0].data = temperature;
      this.lineChartData[1].data = heatIndex;
    }
  }
}
