import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth-guard-guard';
import { ApplicationForm } from './application-form/application.form';
import { PROFILE_ROUTES } from './profile/profile.routes';
import { CreateStudentPage } from './profile/student-forms/create-student-page/create-student-page';

export const STUDENTS_ROUTES: Routes = [
  {
    path: 'students',
    canActivateChild: [authGuard],
    children: [
      { path: 'new/:userID/profile', component: CreateStudentPage, title: 'Profile form' },
      {
        path: ':studentID',
        children: [
          { path: 'apply', component: ApplicationForm, title: 'Application form' },
          { path: 'profile', children: PROFILE_ROUTES },
        ],
      },
    ],
  },
];
