import { Routes } from '@angular/router';
import { LoginForm } from './components/login-form/login.form';
import { RegisterForm } from './components/register-form/register.form';
import { notLoggedGuard } from '../../core/guards/not-logged.guard';
import { authentication } from './authentication.paths';

const routeTree = authentication;

export const AUTHENTICATION_ROUTES: Routes = [
  {
    path: routeTree.segment.replace('/', ''),
    canActivateChild: [notLoggedGuard],
    children: [
      { path: routeTree.login.segment, component: LoginForm, title: 'Sign in' },
      { path: routeTree.register.segment, component: RegisterForm, title: 'Register' },
    ],
  },
];
