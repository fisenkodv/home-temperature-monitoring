import {
  Action,
  Selector,
  State,
  StateContext,
  createSelector,
} from '@ngxs/store';
import { finalize, map, tap } from 'rxjs/operators';

import { SetLoading } from '../../store/app.actions';
import { Device, Measurement } from '../models';
import { DeviceService, MeasurementsService } from '../services';
import { LoadDevice, LoadDevices, LoadMeasurement } from './devices.actions';
import { forkJoin } from 'rxjs';

export type DeviceItemStateModel = Device & { measurements: Measurement[] };
//export type DevicesStateModel = DeviceItemStateModel[];

export type DevicesStateModel = { [key: string]: DeviceItemStateModel };

@State<DevicesStateModel>({
  name: 'devices',
  defaults: {},
})
export class DevicesState {
  @Selector()
  public static devices(state: DevicesStateModel): Device[] {
    return Object.values(state);
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
  loadDevices({
    patchState,
    setState,
    dispatch,
  }: StateContext<DevicesStateModel>) {
    dispatch(new SetLoading(true));
    return this.deviceService.getAll().pipe(
      map(devices =>
        devices
          .map(x => this.deviceToDeviceItemStateModel(x))
          .forEach(x => patchState({ [x.uuid]: x }))
      ),
      finalize(() => dispatch(new SetLoading(false)))
    );
  }

  @Action(LoadDevice)
  loadDevice(
    { setState, dispatch }: StateContext<DevicesStateModel>,
    { deviceUuid }: LoadDevice
  ) {
    // dispatch(new SetLoading(true));
    // return this.deviceService.get(deviceUuid).pipe(
    //   map(device => setState([this.deviceToDeviceItemStateModel(device)])),
    //   finalize(() => dispatch(new SetLoading(false)))
    // );
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
