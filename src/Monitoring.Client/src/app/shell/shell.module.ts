import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@app/material.module';

import { AppComponent } from './components/app/app.component';
import { ShellComponent } from './components/shell/shell.component';

@NgModule({
  imports: [CommonModule, RouterModule, MaterialModule],
  declarations: [AppComponent, ShellComponent],
})
export class ShellModule {}
