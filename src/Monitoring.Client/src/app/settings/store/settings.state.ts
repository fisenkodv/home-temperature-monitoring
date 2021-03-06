import { Device } from '@app/shared/models';
import { DeviceService } from '@app/shared/services';
import { SetLoading } from '@app/store/app.actions';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { finalize, tap } from 'rxjs/operators';

import { LoadSettings, SaveSettings } from './settings.actions';

export interface SettingsStateModel {
  devices: Device[];
}

@State<SettingsStateModel>({
  name: 'settings',
  defaults: {
    devices: [],
  },
})
export class SettingsState {
  @Selector()
  static devices(state: SettingsStateModel): Device[] {
    return state.devices;
  }

  constructor(private deviceService: DeviceService) {}

  @Action(LoadSettings)
  loadSettings({ patchState, dispatch }: StateContext<SettingsStateModel>) {
    dispatch(new SetLoading(true));
    return this.deviceService.getDevices(false).pipe(
      tap(devices => patchState({ devices: devices })),
      finalize(() => dispatch(new SetLoading(false)))
    );
  }

  @Action(SaveSettings)
  saveSettings({ patchState, dispatch }: StateContext<SettingsStateModel>, { devices }: SaveSettings) {
    dispatch(new SetLoading(true));
    return this.deviceService.saveSettings(devices).pipe(
      tap(() => patchState({ devices: devices })),
      finalize(() => dispatch(new SetLoading(false)))
    );
  }
}
