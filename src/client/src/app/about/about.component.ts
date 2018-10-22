import { Component, OnInit } from '@angular/core';
import { environment } from '@env/environment';

import { QuoteService } from './services';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  version: string = environment.version;
  quote: string;
  isLoading: boolean;

  constructor(private quoteService: QuoteService) {}

  ngOnInit() {
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
