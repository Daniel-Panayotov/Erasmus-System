import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminStudentsViewComponent } from './admin-home-resources/admin-students-view/admin-students-view.component';
import { AdminGuard } from '../shared/guards/admin.guard';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { notLoggedGuard } from '../shared/guards/not-logged.guard';
import { FieldsOfEducationComponent } from './admin-home-resources/fields-of-education/fields-of-education.component';
import { FacultiesComponent } from './admin-home-resources/faculties/faculties.component';
import { ForeignContactsComponent } from './admin-home-resources/foreign-contacts/foreign-contacts.component';
import { ReceivingContactsComponent } from './admin-home-resources/receiving-contacts/receiving-contacts.component';
import { MobilitiesComponent } from './admin-home-resources/mobilities/mobilities.component';

const routes: Routes = [
  {
    path: 'menu',
    component: AdminHomeComponent,
    children: [
      { path: 'students', component: AdminStudentsViewComponent },
      { path: 'fields-of-education', component: FieldsOfEducationComponent },
      { path: 'faculties', component: FacultiesComponent },
      { path: 'foreign-contacts', component: ForeignContactsComponent },
      { path: 'receiving-contacts', component: ReceivingContactsComponent },
      { path: 'mobilities', component: MobilitiesComponent },
    ],
    canActivate: [AdminGuard],
  },
  {
    path: 'login',
    component: AdminLoginComponent,
    canActivate: [notLoggedGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminsRoutingModule {}
