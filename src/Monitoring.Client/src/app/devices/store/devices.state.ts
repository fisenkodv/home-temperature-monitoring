import { Action, createSelector, Selector, State, StateContext } from '@ngxs/store';
import { forkJoin } from 'rxjs';
import { finalize, map, tap } from 'rxjs/operators';

import { SetLoading } from '../../store/app.actions';
import { Device, Measurement } from '../models';
import { DeviceService, MeasurementsService } from '../services';
import { LoadDevice, LoadDevices, LoadMeasurement, LoadMeasurements } from './devices.actions';

export interface DeviceItemStateModel {
  loading: boolean;
  name: string;
  measurement: Measurement;
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
  static devices(state: DevicesStateModel): Device[] {
    return Object.keys(state).map(deviceUuid => <Device>{ ...state[deviceUuid], uuid: deviceUuid, isActive: true });
  }

  static device(deviceUuid: string) {
    return createSelector(
      [DevicesState],
      (state: DevicesStateModel) => {
        return <Device>{ ...state[deviceUuid], uuid: deviceUuid, isActive: true };
      }
    );
  }

  static measurement(deviceUuid: string) {
    return createSelector(
      [DevicesState],
      (state: DevicesStateModel) => {
        const device = state[deviceUuid];
        return device && device.measurement ? device.measurement : undefined;
      }
    );
  }

  static measurements(deviceUuid: string) {
    return createSelector(
      [DevicesState],
      (state: DevicesStateModel) => {
        const device = state[deviceUuid];
        return device && device.measurements ? device.measurements : undefined;
      }
    );
  }

  constructor(private deviceService: DeviceService, private measurementService: MeasurementsService) {}

  @Action(LoadDevices)
  loadDevices({ patchState, dispatch }: StateContext<DevicesStateModel>) {
    dispatch(new SetLoading(true));
    return this.deviceService.getDevices(true).pipe(
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
  loadDevice({ patchState, dispatch }: StateContext<DevicesStateModel>, { deviceUuid }: LoadDevice) {
    dispatch(new SetLoading(true));
    return this.deviceService.getDevice(deviceUuid).pipe(
      map(device => patchState({ [device.uuid]: this.deviceToDeviceItemStateModel(device) })),
      finalize(() => dispatch(new SetLoading(false)))
    );
  }

  @Action(LoadMeasurement)
  loadMeasurement({ patchState, getState }: StateContext<DevicesStateModel>) {
    const state = getState();
    const ids = Object.keys(state);
    return forkJoin(ids.map(x => this.measurementService.getLatestMeasurement(x))).pipe(
      tap(measurements => {
        measurements.forEach((measurement, index) => {
          const deviceUuid = ids[index];
          const device = state[deviceUuid];
          device.measurement = measurement;

          patchState({ [deviceUuid]: device });
        });
      }),
      finalize(() => {})
    );
  }

  @Action(LoadMeasurements)
  loadMeasurements({ patchState, getState }: StateContext<DevicesStateModel>, { deviceUuid, hours }: LoadMeasurements) {
    return this.measurementService.getMeasurements(deviceUuid, hours).pipe(
      tap(measurements => {
        const state = getState();
        const device = state[deviceUuid];
        device.measurements = measurements;

        patchState({ [deviceUuid]: device });
      }),
      finalize(() => {})
    );
  }

  private deviceToDeviceItemStateModel(device: Device): DeviceItemStateModel {
    return { loading: false, name: device.name, measurement: null, measurements: [] };
  }
}
