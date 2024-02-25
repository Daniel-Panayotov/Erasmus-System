import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { CoreModule } from '../core/core.module';
import { AppRoutingModule } from '../app-routing.module';
import { AdminStudentsViewComponent } from './admin-students-view/admin-students-view.component';

@NgModule({
  declarations: [AdminHomeComponent, AdminStudentsViewComponent],
  imports: [CommonModule, CoreModule, AppRoutingModule],
})
export class AdminsModule {}
