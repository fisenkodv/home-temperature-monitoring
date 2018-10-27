import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from '@app/core';
import { MaterialModule } from '@app/material.module';
import { SharedModule } from '@app/shared';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DeviceCardComponent } from './components/device-card/device-card.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { TelemetryService } from './services';

const COMPONENTS = [DashboardComponent, DeviceCardComponent];

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    MaterialModule,
    DashboardRoutingModule,
  ],
  declarations: COMPONENTS,
  providers: [TelemetryService],
})
export class DashboardModule {}
