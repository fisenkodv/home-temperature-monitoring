import { Component, OnInit } from '@angular/core';
import { Logger } from '@app/core';
import { environment } from '@env/environment';

const log = new Logger('App');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  ngOnInit() {
    if (environment.production) {
      Logger.enableProductionMode();
    }

    log.debug('Init');
  }
}
