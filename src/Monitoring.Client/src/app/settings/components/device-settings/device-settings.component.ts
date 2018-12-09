import { Component, OnInit } from '@angular/core';
import { Device } from '@app/devices/models';

@Component({
  selector: 'app-device-settings',
  templateUrl: './device-settings.component.html',
  styleUrls: ['./device-settings.component.scss'],
})
export class DeviceSettingsComponent implements OnInit {
  devices: Device[];

  constructor() {
    this.devices = [
      { uuid: '123', name: "Dmitry's Room", isActive: true },
      { uuid: '456', name: "Dmitry's Room", isActive: true },
      { uuid: '789', name: "Dmitry's Room", isActive: true },
    ];
  }

  ngOnInit(): void {}
}
