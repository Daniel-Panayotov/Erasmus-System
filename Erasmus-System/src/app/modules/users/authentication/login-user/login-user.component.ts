import { Component } from '@angular/core';
import { AuthPageComponent } from 'src/app/shared/components/auth-page/auth-page.component';
import {
  authActionString,
  authSectionString,
} from 'src/app/types/apiEnvironmentTypes';

@Component({
  selector: 'app-login-user',
  standalone: true,
  imports: [AuthPageComponent],
  templateUrl: './login-user.component.html',
  styleUrl: './login-user.component.css',
})
export class LoginUserComponent {
  authModule: authSectionString = 'users';
  authAction: authActionString = 'login';
  sectionName: string = 'User';
}
