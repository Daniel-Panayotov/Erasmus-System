import { Routes } from '@angular/router';
import { Home } from './layout/home/home';
import { NotFound } from './layout/not-found/not-found';
import { ApplicationForm } from './features/users/components/application-form/application-form';
import { LoginForm } from './features/authentication/components/login-form/login-form';
import { RegisterForm } from './features/authentication/components/register-form/register-form';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home, title: 'Home page' },
  { path: 'login', component: LoginForm, title: 'Sign in' },
  { path: 'register', component: RegisterForm, title: 'Register' },
  { path: 'apply', component: ApplicationForm, title: 'Erasmus apply' },
  { path: '**', component: NotFound, title: 'Not found' },
];
