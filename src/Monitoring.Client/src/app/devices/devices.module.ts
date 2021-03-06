import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from '@app/core';
import { MaterialModule } from '@app/material.module';
import { ChartsModule, ThemeService } from 'ng2-charts';

import { DashboardPageComponent } from './components/dashboard-page/dashboard-page.component';
import { DeviceCardComponent } from './components/device-card/device-card.component';
import { DevicePageComponent } from './components/device-page/device-page.component';
import { MeasurementComponent } from './components/measurement/measurement.component';
import { MeasurementsComponent } from './components/measurements/measurements.component';
import { DevicesRoutingModule } from './devices-routing.module';
import { MeasurementsService } from './services';

const COMPONENTS = [
  DashboardPageComponent,
  DevicePageComponent,
  DeviceCardComponent,
  MeasurementsComponent,
  MeasurementComponent,
];

@NgModule({
  imports: [CommonModule, CoreModule, MaterialModule, ChartsModule, DevicesRoutingModule],
  declarations: COMPONENTS,
  providers: [MeasurementsService, ThemeService],
})
export class DevicesModule {}
