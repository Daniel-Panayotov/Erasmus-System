import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth-guard-guard';
import { ApplicationForm } from './application-form/application.form';
import { StudentForm } from './profile/student-form/student.form';
import { Profile } from './profile/profile-view/profile';
import { LanguageCompetencyForm } from './profile/language-competency.form/language-competency.form';

export const STUDENTS_ROUTES: Routes = [
  {
    path: '',
    canActivateChild: [authGuard],
    children: [
      {
        path: 'new/:userID/profile',
        component: StudentForm,
        title: 'Profile form',
      },
      {
        path: ':studentID',
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
                path: 'update',
                component: StudentForm,
                title: 'Profile form',
              },
            ],
          },
          {
            path: 'language-competencies',
            children: [
              { path: 'create', component: LanguageCompetencyForm },
              { path: 'update/:competencyID', component: LanguageCompetencyForm },
            ],
          },
        ],
      },
    ],
  },
];
