import { Routes } from '@angular/router';
import { Home } from './components/core/home/home';
import { NotFound } from './components/core/not-found/not-found';
import { ApplicationForm } from './components/forms/application-form/application-form';
import { LoginForm } from './components/forms/login-form/login-form';
import { RegisterForm } from './components/forms/register-form/register-form';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home, title: 'Home page' },
  { path: 'login', component: LoginForm, title: 'Sign in' },
  { path: 'register', component: RegisterForm, title: 'Register' },
  { path: 'apply', component: ApplicationForm, title: 'Erasmus apply' },
  { path: '**', component: NotFound, title: 'Not found' },
];
