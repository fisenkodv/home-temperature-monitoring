import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DeviceService } from './services';

@NgModule({
  imports: [CommonModule],
  declarations: [],
  exports: [],
  providers: [DeviceService],
})
export class SharedModule {}
