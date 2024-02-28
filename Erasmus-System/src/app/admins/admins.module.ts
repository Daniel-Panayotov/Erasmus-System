import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { CoreModule } from '../core/core.module';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [AdminHomeComponent],
  imports: [CommonModule, CoreModule, AppRoutingModule],
})
export class AdminsModule {}
