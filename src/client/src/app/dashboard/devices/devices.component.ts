import { Component, OnInit } from '@angular/core';
import { finalize, tap } from 'rxjs/operators';

import { QuoteService, DeviceService } from '../services';
import { Device } from '../models';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss'],
})
export class DevicesComponent implements OnInit {
  quote: string;
  isLoading: boolean;
  devices: Device[] = [];

  constructor(
    private quoteService: QuoteService,
    private deviceService: DeviceService,
  ) {}

  ngOnInit() {
    this.isLoading = true;

    this.deviceService
      .getAll()
      .pipe(
        tap(devices => (this.devices = devices)),
        finalize(() => (this.isLoading = false)),
      )
      .subscribe();

    this.quoteService
      .getRandomQuote({ category: 'dev' })
      .pipe(
        finalize(() => {
          this.isLoading = false;
        }),
      )
      .subscribe((quote: string) => {
        this.quote = quote;
      });
  }
}
