import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth-guard-guard';
import { ApplicationForm } from '../users/components/application-form/application-form';
import { PROFILE_FORM_STATE, PROFILE_FORM_STATE_MODEL } from '../users/profile-form.state.token';
import { ProfileForm } from '../users/components/profile-form/profile-form';

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
            component: ProfileForm,
            title: 'Profile form',
            providers: [
              {
                provide: PROFILE_FORM_STATE,
                useValue: { isUpdate: true } as PROFILE_FORM_STATE_MODEL,
              },
            ],
          },
          {
            path: 'create',
            component: ProfileForm,
            title: 'Profile form',
            providers: [
              {
                provide: PROFILE_FORM_STATE,
                useValue: { isUpdate: false } as PROFILE_FORM_STATE_MODEL,
              },
            ],
          },
        ],
      },
    ],
  },
];
