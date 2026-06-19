import { Routes } from '@angular/router';
import { LoginForm } from './components/login-form/login-form';
import { RegisterForm } from './components/register-form/register-form';
import { notLoggedGuardGuard } from '../../core/guards/not-logged-guard-guard';

export const AUTHENTICATION_ROUTES: Routes = [
  {
    path: 'auth',
    canActivateChild: [notLoggedGuardGuard],
    children: [
      { path: 'login', component: LoginForm, title: 'Sign in' },
      { path: 'register', component: RegisterForm, title: 'Register' },
    ],
  },
];
