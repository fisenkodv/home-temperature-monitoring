import { State } from '@ngxs/store';
import { Device } from '@app/shared/models';

export interface SettingsStateModel{
  devices: Device[];
}

@State<SettingsStateModel>({
  name: 'settings',
  defaults: {
    devices: []
  }
})
export class SettingsState {}
