import 'chart.js';
import 'hammerjs';

import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { CoreModule } from '@app/core';
import { environment } from '@env/environment';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsModule } from '@ngxs/store';

import { AboutModule } from './about/about.module';
import { AppRoutingModule } from './app-routing.module';
import { DevicesModule } from './devices/devices.module';
import { MaterialModule } from './material.module';
import { SettingsModule } from './settings/settings.module';
import { AppComponent } from './shell/components/app/app.component';
import { ShellModule } from './shell/shell.module';
import { States } from './store/module.store';
import { SharedModule } from './shared/shared.module';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ServiceWorkerModule.register('./ngsw-worker.js', {
      enabled: environment.production,
    }),
    NgxsModule.forRoot(States),
    NgxsReduxDevtoolsPluginModule.forRoot({
      disabled: environment.production,
    }),
    NgxsLoggerPluginModule.forRoot({ logger: console, collapsed: false }),
    HttpClientModule,
    MaterialModule,
    CoreModule,
    SharedModule,
    ShellModule,
    DevicesModule,
    AboutModule,
    SettingsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
