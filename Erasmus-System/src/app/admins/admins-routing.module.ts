import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminStudentsViewComponent } from './admin-students-view/admin-students-view.component';

const routes: Routes = [
  {
    path: 'home',
    children: [{ path: 'students', component: AdminStudentsViewComponent }],
    component: AdminHomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminsRoutingModule {}
