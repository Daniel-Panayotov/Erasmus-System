import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../../features/authentication/services/authentication-service';

@Component({
  selector: 'app-navigation',
  imports: [RouterLink],
  templateUrl: './navigation.html',
  styleUrl: './navigation.css',
})
export class Navigation {
  private auth = inject(AuthenticationService);
  private router = inject(Router);

  public async logout() {
    this.auth.logout().subscribe();
    await this.router.navigateByUrl('/');
  }

  get authenticated() {
    return this.auth.authenticated;
  }

  get studentID() {
    return this.auth.state()?.student.studentID;
  }
}
