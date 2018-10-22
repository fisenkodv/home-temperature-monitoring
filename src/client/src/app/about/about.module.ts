import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about.component';
import { SharedModule } from '@app/shared';
import { QuoteService } from './services';

@NgModule({
  imports: [CommonModule, SharedModule, AboutRoutingModule],
  declarations: [AboutComponent],
  providers: [QuoteService],
})
export class AboutModule {}
