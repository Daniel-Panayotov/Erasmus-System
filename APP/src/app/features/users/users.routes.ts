import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth-guard-guard';
import { ApplicationForm } from './components/application-form/application.form';
import { StudentForm } from './components/student-form/student.form';

export const USERS_ROUTES: Routes = [
  {
    path: '',
    canActivateChild: [authGuard],
    children: [
      { path: 'apply', component: ApplicationForm, title: 'Application form' },
      {
        path: 'profile',
        children: [
          {
            path: 'create',
            component: StudentForm,
            title: 'Profile form',
          },
          {
            path: 'update/:ID',
            component: StudentForm,
            title: 'Profile form',
          },
        ],
      },
    ],
  },
];
