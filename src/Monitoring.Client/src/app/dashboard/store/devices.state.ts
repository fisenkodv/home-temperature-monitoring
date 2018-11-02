import { State, Action, StateContext } from '@ngxs/store';
import { Measurement } from '../models';
import { DeviceService } from '../services';
import { LoadDevices } from './devices.actions';
import { tap } from 'rxjs/operators';

export interface DevicesStateModel {
  [uuid: string]: {
    name: string;
    measurement: Measurement;
  };
}

@State<DevicesStateModel>({
  name: 'devices',
  defaults: {},
})
export class DevicesState {
  constructor(private deviceService: DeviceService) {}

  @Action(LoadDevices)
  loadDevices({ patchState }: StateContext<DevicesStateModel>) {
    return this.deviceService.getAll().pipe(
      tap(devices => {
        const state: DevicesStateModel = {};
        devices.forEach(x => {
          state[x.uuid] = { name: x.name, measurement: undefined };
        });
        patchState(state);
      }),
    );
  }
}
