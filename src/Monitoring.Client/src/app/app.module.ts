import 'hammerjs';
import 'chart.js';

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
import { AppComponent } from './shell/components/app/app.component';
import { ShellModule } from './shell/shell.module';
import { States } from './store/module.store';

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
    ShellModule,
    DevicesModule,
    AboutModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
