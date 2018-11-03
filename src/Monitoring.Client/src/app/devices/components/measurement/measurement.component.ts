import { Component, OnInit, Input } from '@angular/core';
import { Measurement } from '@app/devices/models';

@Component({
  selector: 'app-measurement',
  templateUrl: './measurement.component.html',
  styleUrls: ['./measurement.component.scss'],
})
export class MeasurementComponent implements OnInit {
  @Input()
  measurement: Measurement;

  constructor() {}

  ngOnInit() {}
}
