import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from '@app/core';
import { MaterialModule } from '@app/material.module';
import { SharedModule } from '@app/shared';

import { DeviceComponent } from './device/device.component';
import { DevicesComponent } from './devices/devices.component';
import { HomeRoutingModule } from './home-routing.module';
import { DeviceService, TelemetryService } from './services';

const COMPONENTS = [DevicesComponent, DeviceComponent];

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    MaterialModule,
    HomeRoutingModule,
  ],
  declarations: COMPONENTS,
  providers: [DeviceService, TelemetryService],
})
export class HomeModule {}
