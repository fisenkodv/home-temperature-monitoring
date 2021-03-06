import { Component, Input, ViewChild } from '@angular/core';
import { Measurement } from '@app/devices/models';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { BaseChartDirective, Color, Label } from 'ng2-charts';
@Component({
  selector: 'app-measurements',
  templateUrl: './measurements.component.html',
  styleUrls: ['./measurements.component.scss'],
})
export class MeasurementsComponent {
  public lineChartData: ChartDataSets[] = [{ data: [], label: 'Temperature' }, { data: [], label: 'Heat Index' }];
  public lineChartOptions: ChartOptions = {
    responsive: true,
    elements: { point: { radius: 0 } },
    tooltips: { intersect: false },
    scales: {
      xAxes: [
        {
          type: 'time',
          time: { unit: 'hour' },
          ticks: { autoSkip: true, maxTicksLimit: 24 },
        },
      ],
    },
  };
  public lineChartLabels: Label[] = [];
  public lineChartColors: Color[] = [
    {
      backgroundColor: 'rgba(103,57,181, 0.1)',
      borderColor: 'rgba(103,57,181, 1)',
      pointBackgroundColor: 'rgba(103,57,181, 1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(103,57,181, 0.8)',
    },
    {
      backgroundColor: 'rgba(77,83,96,0.1)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)',
    },
  ];

  @ViewChild(BaseChartDirective, { static: false }) chart: BaseChartDirective;

  @Input()
  set measurements(measurements: Measurement[]) {
    if (measurements && measurements.length) {
      const temperature = measurements.map(x => this.toPoint(x, 'temperature'));
      const heatIndex = measurements.map(x => this.toPoint(x, 'heatIndex'));

      this.lineChartData[0].data = temperature;
      this.lineChartData[1].data = heatIndex;
    }
  }

  private toPoint<K extends keyof Measurement>(measurement: Measurement, field: K) {
    return {
      t: new Date(measurement.timeStamp),
      y: Number((<number>measurement[field]).toFixed(3)),
    };
  }
}
