import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth.guard';
import { ApplicationForm } from './application-form/application.form';
import { PROFILE_ROUTES } from './profile/profile.routes';
import { CreateStudentPage } from './profile/student-forms/create-student-page/create-student.page';
import { APPLICATIONS_ROUTES } from './applications/applications.routes';
import { ProfileShell } from './profile/profile-shell/profile-shell';
import { LanguageCompetencyTable } from './profile/language-competency-table/language-competency-table';
import { CreateCompetencyPage } from './profile/language-competency-forms/create-competency-page/create-competency.page';

export const STUDENTS_ROUTES: Routes = [
  {
    path: 'students',
    canActivateChild: [authGuard],
    children: [
      // {
      //   path: 'new/:userID',
      //   component: ProfileShell,
      //   children: [
      //     { path: 'profile', component: CreateStudentPage },
      //     { path: 'language-competencies', component: LanguageCompetencyTable },
      //     { path: 'language-competencies/create', component: CreateCompetencyPage },
      //   ],
      // },
      { path: 'new/:userID/profile', component: CreateStudentPage, title: 'Profile form' },
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
