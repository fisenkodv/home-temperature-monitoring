import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Logger } from '@app/core';
import { environment } from '@env/environment';
import { merge } from 'rxjs';
import { filter, map, mergeMap } from 'rxjs/operators';

const log = new Logger('App');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
  ) {}

  ngOnInit() {
    // Setup logger
    if (environment.production) {
      Logger.enableProductionMode();
    }

    log.debug('init');

    const onNavigationEnd = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
    );
  }
}
