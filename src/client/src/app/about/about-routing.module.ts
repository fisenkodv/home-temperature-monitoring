import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Shell } from '@app/shell/services/shell.service';

import { AboutComponent } from './components/about/about.component';

const routes: Routes = [
  Shell.childRoutes([{ path: 'about', component: AboutComponent}])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class AboutRoutingModule {}
