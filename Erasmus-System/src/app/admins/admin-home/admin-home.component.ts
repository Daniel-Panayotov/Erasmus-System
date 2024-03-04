import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/app/shared/environments/environment';
import { adminRoutes } from 'src/app/shared/environments/siteRoutingEnvironment';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css'],
})
export class AdminHomeComponent {
  isNavShown: boolean = true;
  adminRoutes = adminRoutes;

  constructor(private cookieService: CookieService, private router: Router) {}

  toggleNav(): void {
    this.isNavShown = !this.isNavShown;
  }

  logoutAdmin(): void {
    this.cookieService.delete(environment.authCookieName, '/');
    this.router.navigate([this.adminRoutes.login]);
  }
}
