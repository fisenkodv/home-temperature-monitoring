import { SettingsState } from '@app/settings/store/settings.state';
import { Action, Selector, State, StateContext } from '@ngxs/store';

import { DevicesState } from '../devices/store/devices.state';
import { SetLoading } from './app.actions';

export interface ApplicationStateModel {
  loading: boolean;
}

@State<ApplicationStateModel>({
  name: 'app',
  defaults: {
    loading: false,
  },
  children: [DevicesState, SettingsState],
})
export class ApplicationState {
  @Selector()
  static loading(state: ApplicationStateModel): boolean {
    return state.loading;
  }

  @Action(SetLoading)
  setLoading({ patchState }: StateContext<ApplicationStateModel>, { loading }: SetLoading) {
    patchState({ loading });
  }
}
