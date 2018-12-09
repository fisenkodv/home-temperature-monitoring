import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Shell } from '@app/shell/services/shell.service';

import { DeviceSettingsComponent } from './components/device-settings/device-settings.component';
import { SettingsComponent } from './components/settings/settings.component';

const routes: Routes = [
  Shell.childRoutes([
    { path: 'settings', redirectTo: 'settings/devices', pathMatch: 'full' },
    {
      path: 'settings',
      component: SettingsComponent,
      children: [{ path: 'devices', component: DeviceSettingsComponent }],
    },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class SettingsRoutingModule {}
