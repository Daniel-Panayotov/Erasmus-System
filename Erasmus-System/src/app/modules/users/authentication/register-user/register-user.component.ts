import { Component } from '@angular/core';
import { AuthPageComponent } from 'src/app/shared/components/auth-page/auth-page.component';
import {
  authActionString,
  authSectionString,
} from 'src/app/types/apiEnvironmentTypes';

@Component({
  selector: 'app-register-user',
  standalone: true,
  imports: [AuthPageComponent],
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.css',
})
export class RegisterUserComponent {
  authModule: authSectionString = 'users';
  authAction: authActionString = 'register';
  sectionName: string = 'User';
}
