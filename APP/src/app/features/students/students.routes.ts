import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth-guard-guard';
import { ApplicationForm } from './components/application-form/application.form';
import { StudentForm } from './components/student-form/student.form';
import { Profile } from './components/profile/profile';
import { LanguageCompetencyForm } from './components/language-competency.form/language-competency.form';

export const STUDENTS_ROUTES: Routes = [
  {
    path: ':studentID',
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
