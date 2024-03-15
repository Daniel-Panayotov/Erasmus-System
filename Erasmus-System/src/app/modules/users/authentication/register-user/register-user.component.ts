import { Component } from '@angular/core';
import { AuthPageComponent } from 'src/app/shared/components/auth-page/auth-page.component';

@Component({
  selector: 'app-register-user',
  standalone: true,
  imports: [AuthPageComponent],
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.css',
})
export class RegisterUserComponent {
  authModule: string = 'users';
  authAction: string = 'register';
  sectionName: string = 'User';
}
