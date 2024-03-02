import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/app/shared/environments/environment';
import { AdminService } from '../admin.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css',
})
export class AdminLoginComponent {
  showPassword: boolean = false;
  error: boolean = false;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private cookieService: CookieService,
    private router: Router
  ) {}

  //create form with validators
  adminLoginForm = this.fb.group({
    email: [
      '',
      [Validators.required, Validators.pattern(environment.emailRegex)],
    ],
    password: ['', [Validators.required, Validators.minLength(10)]],
  });

  async onSubmit(): Promise<void> {
    const { email, password } = this.adminLoginForm.value;

    //validate
    if (!email || !password) {
      return;
    }

    if (!environment.emailRegex.exec(email) || password.length < 10) {
      return;
    }

    try {
      const response = await this.adminService.loginAdmin({ email, password });
      const data = await response.json();
      const { jwt } = data;

      this.cookieService.set(environment.authCookieName, jwt, undefined, '/');
      this.router.navigate(['/admins/menu']);
    } catch (err) {
      this.error = true;
    }
  }

  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }
}
