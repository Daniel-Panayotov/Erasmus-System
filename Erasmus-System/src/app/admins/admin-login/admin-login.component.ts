import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthPageComponent } from 'src/app/shared/components/auth-page/auth-page.component';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, AuthPageComponent],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css',
})
export class AdminLoginComponent {
  authModule: string = 'admins';
  authAction: string = 'login';
  sectionName: string = 'Admin';
}
