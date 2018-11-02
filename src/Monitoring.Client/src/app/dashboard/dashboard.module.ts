import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from '@app/core';
import { MaterialModule } from '@app/material.module';
import { SharedModule } from '@app/shared';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { DeviceCardComponent } from './components/device-card/device-card.component';
import { MeasurementComponent } from './components/measurement/measurement.component';
import { MeasurementsComponent } from './components/measurements/measurements.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MeasurementsService } from './services';
import { DashboardPageComponent } from './components/dashboard-page/dashboard-page.component';
import { DevicePageComponent } from './components/device-page/device-page.component';

const COMPONENTS = [
  DashboardPageComponent,
  DevicePageComponent,
  DeviceCardComponent,
  MeasurementsComponent,
  MeasurementComponent,
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
