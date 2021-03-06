import { Component } from '@angular/core';
import { ApplicationState } from '@app/store/app.store';
import { Select } from '@ngxs/store';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent {
  @Select(ApplicationState.loading) loading$: BehaviorSubject<boolean>;

  constructor() {}
}
