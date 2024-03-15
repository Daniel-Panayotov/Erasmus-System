import { Component } from '@angular/core';
import { AuthPageComponent } from 'src/app/shared/components/auth-page/auth-page.component';

@Component({
  selector: 'app-login-user',
  standalone: true,
  imports: [AuthPageComponent],
  templateUrl: './login-user.component.html',
  styleUrl: './login-user.component.css',
})
export class LoginUserComponent {
  authModule: string = 'users';
  authAction: string = 'login';
  sectionName: string = 'User';
}
