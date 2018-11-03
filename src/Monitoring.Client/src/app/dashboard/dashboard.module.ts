import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from '@app/core';
import { MaterialModule } from '@app/material.module';
import { NgxsModule } from '@ngxs/store';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { DashboardPageComponent } from './components/dashboard-page/dashboard-page.component';
import { DeviceCardComponent } from './components/device-card/device-card.component';
import { DevicePageComponent } from './components/device-page/device-page.component';
import { MeasurementComponent } from './components/measurement/measurement.component';
import { MeasurementsComponent } from './components/measurements/measurements.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DeviceService, MeasurementsService } from './services';
import { States } from './store/module.state';

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
    MaterialModule,
    NgxChartsModule,
    DashboardRoutingModule,
  ],
  declarations: COMPONENTS,
  providers: [MeasurementsService, DeviceService],
})
export class DashboardModule {}
