import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth-guard-guard';
import { ApplicationForm } from './components/application-form/application.form';
import { StudentForm } from './components/student-form/student.form';
import { Profile } from './components/profile/profile';

export const USERS_ROUTES: Routes = [
  {
    path: ':userID',
    canActivateChild: [authGuard],
    children: [
      { path: 'apply', component: ApplicationForm, title: 'Application form' },
      {
        path: 'profile',
        children: [
          {
            path: 'view',
            component: Profile,
            title: 'Profile view',
          },
          {
            path: 'create',
            component: StudentForm,
            title: 'Profile form',
          },
          {
            path: 'update',
            component: StudentForm,
            title: 'Profile form',
          },
        ],
      },
    ],
  },
];
