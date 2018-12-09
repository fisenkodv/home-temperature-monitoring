import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from '@app/core';
import { MaterialModule } from '@app/material.module';

import { DeviceSettingsComponent } from './components/device-settings/device-settings.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { SettingsComponent } from './components/settings/settings.component';
import { SettingsRoutingModule } from './settings-routing.module';

const COMPONENTS = [SettingsComponent, DeviceSettingsComponent, NavigationComponent];

@NgModule({
  imports: [CommonModule, CoreModule, MaterialModule, SettingsRoutingModule],
  declarations: COMPONENTS,
  providers: [],
})
export class SettingsModule {}
