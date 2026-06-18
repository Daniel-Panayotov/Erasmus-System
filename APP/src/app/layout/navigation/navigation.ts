import { Component, computed, inject, Signal, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../../features/authentication/services/authentication-service';
import { providedIcons } from '../../shared/utils/iconProvider';
import { HorizontalNavigation } from '../../shared/components/horizontal-navigation/horizontal-navigation';
import { NavIcon } from '../../shared/models/horizontal-navigation.models';

@Component({
  selector: 'app-navigation',
  imports: [RouterLink, HorizontalNavigation],
  templateUrl: './navigation.html',
  styleUrl: './navigation.css',
})
export class Navigation {
  private auth = inject(AuthenticationService);
  private router = inject(Router);

  public profileClicked = signal(true);

  private studentNavIcons: Signal<NavIcon[]> = computed(() => [
    {
      iconName: providedIcons.heroUser,
      route: '/users/profile/update/' + this.auth.state()?.student?.studentID,
      name: 'Update profile',
      float: 'left',
    },
    {
      iconName: providedIcons.heroClipboard,
      route: '/users/apply',
      name: 'Apply',
      float: 'left',
    },
    {
      iconName: providedIcons.heroClipboard,
      route: '/users/profile/view/' + this.auth.state()?.student?.studentID,
      name: 'Profile',
      float: 'right',
    },
  ]);

  private notStudentNavIcons: NavIcon[] = [
    {
      iconName: providedIcons.heroUser,
      route: '/users/profile/create',
      name: 'Create profile',
      float: 'left',
    },
  ];

  public profileNavIcons: Signal<NavIcon[]> = computed(() => {
    const items: NavIcon[] = [
      {
        iconName: providedIcons.heroLockClosed,
        route: '',
        name: 'Logout',
        float: 'right',
        callback: this.logout.bind(this),
      },
    ];

    if (this.auth.state()?.student) items.push(...this.studentNavIcons());
    else items.push(...this.notStudentNavIcons);

    return items;
  });

  public handleShowChange(change: boolean) {
    this.profileClicked.set(change);
  }

  public async logout() {
    this.auth.logout().subscribe((x) => {
      this.router.navigateByUrl('/');
    });
  }

  get authenticated() {
    return this.auth.authenticated;
  }
}
