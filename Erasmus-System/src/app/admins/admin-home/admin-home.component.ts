import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FooterComponent } from 'src/app/core/footer/footer.component';
import { AuthService } from 'src/app/services/general-services/auth.service';
import {
  adminRoutes,
  home,
} from 'src/app/shared/environments/siteRoutingEnvironment';

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FooterComponent],
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css'],
})
export class AdminHomeComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  isNavShown: boolean = true;
  adminRoutes = adminRoutes;
  homeRoute: string = home;

  toggleNav(): void {
    this.isNavShown = !this.isNavShown;
  }

  logoutAdmin(): void {
    this.authService.deleteJwtCookie();
    this.router.navigate([this.adminRoutes.login]);
  }
}
