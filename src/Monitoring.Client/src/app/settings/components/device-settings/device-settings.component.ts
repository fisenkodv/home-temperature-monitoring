import { Component, OnInit } from '@angular/core';
import { Device } from '@app/devices/models';
import { Select } from '@ngxs/store';
import { SettingsState } from '@app/settings/store/settings.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-device-settings',
  templateUrl: './device-settings.component.html',
  styleUrls: ['./device-settings.component.scss'],
})
export class DeviceSettingsComponent implements OnInit {
  @Select(SettingsState.devices) devices$: Observable<Device[]>;

  constructor() {}

  ngOnInit(): void {}
}
