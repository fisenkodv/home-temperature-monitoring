import { Action, Selector, State, StateContext } from '@ngxs/store';
import { finalize, map, tap } from 'rxjs/operators';

import { SetLoading } from '../../store/app.actions';
import { Device, Measurement } from '../models';
import { DeviceService, MeasurementsService } from '../services';
import { LoadDevice, LoadDevices, LoadMeasurement } from './devices.actions';
import { forkJoin } from 'rxjs';

export type DeviceItemStateModel = Device & { measurements: Measurement[] };
export type DevicesStateModel = DeviceItemStateModel[];

@State<DevicesStateModel>({
  name: 'devices',
  defaults: [],
})
export class DevicesState {
  @Selector()
  public static devices(state: DevicesStateModel): Device[] {
    return state;
  }
  constructor(
    private deviceService: DeviceService,
    private measurementService: MeasurementsService
  ) {}

  @Action(LoadDevices)
  loadDevices({ setState, dispatch }: StateContext<DevicesStateModel>) {
    dispatch(new SetLoading(true));
    return this.deviceService.getAll().pipe(
      map(devices =>
        setState(devices.map(x => this.deviceToDeviceItemStateModel(x)))
      ),
      finalize(() => dispatch(new SetLoading(false)))
    );
  }

  @Action(LoadDevice)
  loadDevice(
    { setState, dispatch }: StateContext<DevicesStateModel>,
    { deviceUuid }: LoadDevice
  ) {
    dispatch(new SetLoading(true));
    return this.deviceService.get(deviceUuid).pipe(
      map(device => setState([this.deviceToDeviceItemStateModel(device)])),
      finalize(() => dispatch(new SetLoading(false)))
    );
  }

  @Action(LoadMeasurement)
  loadMeasurement({ setState, getState }: StateContext<DevicesStateModel>) {
    const state = getState();
    const ids = state.map(x => x.uuid);
    return forkJoin(
      ids.map(x => this.measurementService.getLatestMeasurement(x))
    ).pipe(
      tap(measurements => {
        for (let deviceIndex = 0; deviceIndex < state.length; deviceIndex++) {
          const device = state[deviceIndex];
          device.measurements.splice(0, 1, measurements[deviceIndex]);
        }
        setState(state);
      }),
      finalize(() => {})
    );
  }

  private deviceToDeviceItemStateModel(
    device: Device,
    measurements: Measurement[] = []
  ): DeviceItemStateModel {
    return { ...device, measurements: measurements };
  }
}
