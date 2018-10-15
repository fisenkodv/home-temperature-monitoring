import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from '@app/core';
import { MaterialModule } from '@app/material.module';
import { SharedModule } from '@app/shared';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { RoomCardComponent } from './room-card/room-card.component';
import { QuoteService } from './services';

const COMPONENTS = [HomeComponent, RoomCardComponent, RoomCardComponent];

@NgModule({
  imports: [CommonModule, CoreModule, SharedModule, MaterialModule, HomeRoutingModule],
  declarations: COMPONENTS,
  providers: [QuoteService],
})
export class HomeModule {}
