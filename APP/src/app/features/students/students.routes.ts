import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth.guard';
import { ApplicationForm } from './shared/application-form/application.form';
import { PROFILE_ROUTES } from './profile/profile.routes';
import { APPLICATIONS_ROUTES } from './applications/applications.routes';
import { PROFILE_NEW_ROUTES } from './profile-new/profile-new.routes';

export const STUDENTS_ROUTES: Routes = [
  {
    path: 'students',
    canActivateChild: [authGuard],
    children: [
      { path: 'new/:userID', children: PROFILE_NEW_ROUTES },
      {
        path: ':studentID',
        children: [
          { path: 'apply', component: ApplicationForm, title: 'Application form' },
          { path: 'applications', children: APPLICATIONS_ROUTES },
          { path: 'profile', children: PROFILE_ROUTES },
        ],
      },
    ],
  },
];
