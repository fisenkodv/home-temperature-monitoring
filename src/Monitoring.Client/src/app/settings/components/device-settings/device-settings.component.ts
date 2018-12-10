import { Component, OnDestroy, OnInit } from '@angular/core';
import { Device } from '@app/devices/models';
import { SaveSettings } from '@app/settings/store/settings.actions';
import { SettingsState } from '@app/settings/store/settings.state';
import { Store } from '@ngxs/store';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-device-settings',
  templateUrl: './device-settings.component.html',
  styleUrls: ['./device-settings.component.scss'],
})
export class DeviceSettingsComponent implements OnInit, OnDestroy {
  private unsubscribe: Subject<void> = new Subject();

  public devices: Device[] = [];

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store
      .select(SettingsState.devices)
      .pipe(
        takeUntil(this.unsubscribe),
        map(devices => (this.devices = devices))
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  public onChangeDeviceActivity(device: Device) {
    device.isActive = !device.isActive;
  }

  public onSaveClick() {
    this.store.dispatch(new SaveSettings(this.devices));
  }
}
