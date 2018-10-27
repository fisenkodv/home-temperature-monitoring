import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@app/material.module';

import { ShellComponent } from './components/shell/shell.component';

@NgModule({
  imports: [CommonModule, RouterModule, MaterialModule],
  declarations: [ShellComponent],
})
export class ShellModule {}
