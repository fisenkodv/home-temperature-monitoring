import { Action, Selector, State, StateContext } from '@ngxs/store';
import { finalize, tap, map } from 'rxjs/operators';

import { SetLoading } from '../../store/app.actions';
import { Device, Measurement } from '../models';
import { DeviceService } from '../services';
import { LoadDevices } from './devices.actions';

@State<Device[]>({
  name: 'devices',
  defaults: [],
})
export class DevicesState {
  @Selector()
  public static devices(state: Device[]): Device[] {
    return state;
  }
  constructor(private deviceService: DeviceService) {}

  @Action(LoadDevices)
  loadDevices({ setState, dispatch }: StateContext<Device[]>) {
    dispatch(new SetLoading(true));
    return this.deviceService.getAll().pipe(
      map(devices => {
        return setState(devices);
      }),
      finalize(() => dispatch(new SetLoading(false))),
    );
  }
}
