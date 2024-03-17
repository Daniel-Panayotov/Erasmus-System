import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { FooterComponent } from 'src/app/core/footer/footer.component';
import { environment } from 'src/app/shared/environments/environment';
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
  private cookieService = inject(CookieService);
  private router = inject(Router);

  isNavShown: boolean = true;
  adminRoutes = adminRoutes;
  homeRoute: string = home;

  toggleNav(): void {
    this.isNavShown = !this.isNavShown;
  }

  logoutAdmin(): void {
    this.cookieService.delete(environment.authCookieName, '/');
    this.router.navigate([this.adminRoutes.login]);
  }
}
