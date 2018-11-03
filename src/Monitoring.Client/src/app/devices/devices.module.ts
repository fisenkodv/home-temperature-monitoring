import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from '@app/core';
import { MaterialModule } from '@app/material.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { DashboardPageComponent } from './components/dashboard-page/dashboard-page.component';
import { DeviceCardComponent } from './components/device-card/device-card.component';
import { DevicePageComponent } from './components/device-page/device-page.component';
import { MeasurementComponent } from './components/measurement/measurement.component';
import { MeasurementsComponent } from './components/measurements/measurements.component';
import { DevicesRoutingModule } from './devices-routing.module';
import { DeviceService, MeasurementsService } from './services';

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
    DevicesRoutingModule,
  ],
  declarations: COMPONENTS,
  providers: [MeasurementsService, DeviceService],
})
export class DevicesModule {}
