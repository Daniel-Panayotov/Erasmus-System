import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/app/shared/environments/environment';
import { AdminService } from '../admin.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css',
})
export class AdminLoginComponent {
  showPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private cookieService: CookieService
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
      console.log(data);

      // this.cookieService.set(environment.authCookieName, jwt)
    } catch (err) {
      console.log(err);
    }
  }

  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }
}
