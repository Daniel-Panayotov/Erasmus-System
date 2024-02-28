import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminStudentsViewComponent } from './admin-students-view/admin-students-view.component';
import { AdminGuard } from '../shared/guards/admin.guard';
import { AdminLoginComponent } from './admin-login/admin-login.component';

const routes: Routes = [
  {
    path: 'menu',
    component: AdminHomeComponent,
    children: [{ path: 'students', component: AdminStudentsViewComponent }],
    canActivate: [AdminGuard],
  },
  {
    path: 'login',
    component: AdminLoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminsRoutingModule {}
