import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Shell } from '@app/shell/services/shell.service';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DeviceComponent } from './components/device/device.component';

const routes: Routes = [
  Shell.childRoutes([
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    {
      path: 'dashboard',
      children: [
        { path: '', component: DashboardComponent },
        { path: ':uuid', component: DeviceComponent },
      ],
    },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class DashboardRoutingModule {}
