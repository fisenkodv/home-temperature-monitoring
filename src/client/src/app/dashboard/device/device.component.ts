import { Component, OnInit, Input } from '@angular/core';
import { Device } from '../models';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss'],
})
export class DeviceComponent implements OnInit {
  @Input()
  device: Device;
  constructor() {}

  ngOnInit() {}
}
