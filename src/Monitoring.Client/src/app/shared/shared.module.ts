import { NgModule, Optional, SkipSelf } from '@angular/core';

import { DeviceService } from './services';

@NgModule({
  imports: [],
  providers: [DeviceService],
})
export class SharedModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: SharedModule
  ) {
    // Import guard
    if (parentModule) {
      throw new Error(`${parentModule} has already been loaded. Import Core module in the AppModule only.`);
    }
  }
}
