import { Component } from '@angular/core';
import { AuthenticationForm } from '../authentication-form/authentication-form';

@Component({
  selector: 'app-register-form',
  imports: [AuthenticationForm],
  templateUrl: './register-form.html',
  styleUrl: './register-form.css',
})
export class RegisterForm {}
