import {
  Action,
  createSelector,
  Selector,
  State,
  StateContext,
} from '@ngxs/store';
import { forkJoin } from 'rxjs';
import { finalize, map, tap } from 'rxjs/operators';

import { SetLoading } from '../../store/app.actions';
import { Device, Measurement } from '../models';
import { DeviceService, MeasurementsService } from '../services';
import { LoadDevice, LoadDevices, LoadMeasurement } from './devices.actions';

export interface DeviceItemStateModel {
  name: string;
  measurements: Measurement[];
}

export interface DevicesStateModel {
  [key: string]: DeviceItemStateModel;
}

@State<DevicesStateModel>({
  name: 'devices',
  defaults: {},
})
export class DevicesState {
  @Selector()
  public static devices(state: DevicesStateModel): Device[] {
    return Object.keys(state).map(
      deviceUuid => <Device>{ ...state[deviceUuid], uuid: deviceUuid }
    );
  }

  static measurement(deviceUuid: string) {
    return createSelector([DevicesState], (state: DevicesStateModel) => {
      const device = state[deviceUuid];
      return device.measurements ? device.measurements[0] : {};
    });
  }

  constructor(
    private deviceService: DeviceService,
    private measurementService: MeasurementsService
  ) {}

  @Action(LoadDevices)
  loadDevices({ patchState, dispatch }: StateContext<DevicesStateModel>) {
    dispatch(new SetLoading(true));
    return this.deviceService.getAll().pipe(
      map(devices =>
        devices.forEach(x => {
          const model = this.deviceToDeviceItemStateModel(x);
          patchState({ [x.uuid]: model });
        })
      ),
      finalize(() => dispatch(new SetLoading(false)))
    );
  }

  @Action(LoadDevice)
  loadDevice(
    { patchState, dispatch }: StateContext<DevicesStateModel>,
    { deviceUuid }: LoadDevice
  ) {
    dispatch(new SetLoading(true));
    return this.deviceService.get(deviceUuid).pipe(
      map(device =>
        patchState({ [device.uuid]: this.deviceToDeviceItemStateModel(device) })
      ),
      finalize(() => dispatch(new SetLoading(false)))
    );
  }

  @Action(LoadMeasurement)
  loadMeasurement({ patchState, getState }: StateContext<DevicesStateModel>) {
    const state = getState();
    const ids = Object.keys(state);
    return forkJoin(
      ids.map(x => this.measurementService.getLatestMeasurement(x))
    ).pipe(
      tap(measurements => {
        measurements.forEach((measurement, index) => {
          const deviceUuid = ids[index];
          const device = state[deviceUuid];
          device.measurements.splice(0, 1, measurement);

          patchState({ [deviceUuid]: device });
        });
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
