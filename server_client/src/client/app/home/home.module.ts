import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { QuoteService } from './services';

@NgModule({
  imports: [CommonModule, CoreModule, SharedModule, HomeRoutingModule],
  declarations: [HomeComponent],
  providers: [QuoteService]
})
export class HomeModule {}
