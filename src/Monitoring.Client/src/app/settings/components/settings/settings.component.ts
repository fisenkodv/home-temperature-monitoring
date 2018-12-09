import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { LoadSettings } from '@app/settings/store/settings.actions';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  constructor(private store: Store) {
    this.store.dispatch(new LoadSettings());
  }

  ngOnInit(): void {}
}
