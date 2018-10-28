import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from '@app/core';
import { MaterialModule } from '@app/material.module';
import { SharedModule } from '@app/shared';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DeviceCardComponent } from './components/device-card/device-card.component';
import { DeviceComponent } from './components/device/device.component';
import { MeasurementsComponent } from './components/measurements/measurements.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MeasurementsService } from './services';

const COMPONENTS = [
  DashboardComponent,
  DeviceCardComponent,
  DeviceComponent,
  MeasurementsComponent,
];

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    MaterialModule,
    NgxChartsModule,
    DashboardRoutingModule,
  ],
  declarations: COMPONENTS,
  providers: [MeasurementsService],
})
export class DashboardModule {}
