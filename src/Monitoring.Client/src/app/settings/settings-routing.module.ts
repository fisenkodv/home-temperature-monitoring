import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Shell } from '@app/shell/services/shell.service';

import { SettingsComponent } from './components/settings/settings.component';


const routes: Routes = [
  Shell.childRoutes([{ path: 'settings', component: SettingsComponent }])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class SettingsRoutingModule { }
