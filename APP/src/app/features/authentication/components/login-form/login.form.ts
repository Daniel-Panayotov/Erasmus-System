import { Component } from '@angular/core';
import { AuthenticationForm } from '../authentication-form/authentication.form';

@Component({
  selector: 'app-login-form',
  imports: [AuthenticationForm],
  templateUrl: './login.form.html',
  styleUrl: './login.form.css',
})
export class LoginForm {}
