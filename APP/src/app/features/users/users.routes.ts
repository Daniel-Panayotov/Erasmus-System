import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth-guard-guard';
import { ApplicationForm } from './components/application-form/application.form';
import { STUDENT_FORM_STATE, STUDENT_FORM_STATE_MODEL } from './student.form.state.token';
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
            path: 'update',
            component: StudentForm,
            title: 'Profile form',
            providers: [
              {
                provide: STUDENT_FORM_STATE,
                useValue: { isUpdate: true } as STUDENT_FORM_STATE_MODEL,
              },
            ],
          },
          {
            path: 'create',
            component: StudentForm,
            title: 'Profile form',
            providers: [
              {
                provide: STUDENT_FORM_STATE,
                useValue: { isUpdate: false } as STUDENT_FORM_STATE_MODEL,
              },
            ],
          },
        ],
      },
    ],
  },
];
