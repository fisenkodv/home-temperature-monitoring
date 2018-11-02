import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Shell } from '@app/shell/services/shell.service';

import { DashboardPageComponent } from './components/dashboard-page/dashboard-page.component';
import { DevicePageComponent } from './components/device-page/device-page.component';

const routes: Routes = [
  Shell.childRoutes([
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    {
      path: 'dashboard',
      children: [
        { path: '', component: DashboardPageComponent },
        { path: ':uuid', component: DevicePageComponent },
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
