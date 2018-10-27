import { Routes, Route } from '@angular/router';

import { ShellComponent } from '../components/shell/shell.component';

export class Shell {
  static childRoutes(routes: Routes): Route {
    return {
      path: '',
      component: ShellComponent,
      children: routes,
      canActivate: [],
      data: { reuse: true }
    };
  }
}
