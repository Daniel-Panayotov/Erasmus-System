import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginUserComponent } from './authentication/login-user/login-user.component';
import { notLoggedGuard } from 'src/app/shared/guards/not-logged.guard';
import { RegisterUserComponent } from './authentication/register-user/register-user.component';
import { ApplyFormComponent } from './apply-form/apply-form.component';
import { loggedGuard } from 'src/app/shared/guards/logged.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginUserComponent,
    canActivate: [notLoggedGuard],
  },
  {
    path: 'register',
    component: RegisterUserComponent,
    canActivate: [notLoggedGuard],
  },
  {
    path: 'apply-erasmus',
    component: ApplyFormComponent,
    canActivate: [loggedGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
