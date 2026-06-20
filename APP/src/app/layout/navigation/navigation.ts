import { Component, computed, inject, Signal, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../../features/authentication/services/authentication-service';
import { providedIcons } from '../../shared/utils/iconProvider';
import { HorizontalNavigation } from '../../shared/components/horizontal-navigation/horizontal-navigation';
import { NavIcon } from '../../shared/models/horizontal-navigation.models';
import { studentsPaths } from '../../features/students/students.paths';
import { authPaths } from '../../features/authentication/authentication.paths';

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
      route: studentsPaths.profileUpdate(this.studentID!.toString()),
      name: 'Update profile',
      float: 'left',
    },
    {
      iconName: providedIcons.heroClipboard,
      route: studentsPaths.apply(this.studentID!.toString()),
      name: 'Apply',
      float: 'left',
    },
    {
      iconName: providedIcons.heroClipboard,
      route: studentsPaths.profileView(this.studentID!.toString()),
      name: 'Profile',
      float: 'right',
    },
  ]);

  private notStudentNavIcons: NavIcon[] = [
    {
      iconName: providedIcons.heroUser,
      route: studentsPaths.newProfile(this.auth.state()?.userID!),
      name: 'Create profile',
      float: 'left',
    },
  ];

  public profileNavIcons: Signal<NavIcon[]> = computed(() => {
    const items: NavIcon[] = [
      {
        iconName: providedIcons.heroLockClosed,
        route: [],
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
      this.router.navigate(authPaths.login());
    });
  }

  get authenticated() {
    return this.auth.authenticated;
  }

  get studentID() {
    return this.auth.state()?.student?.studentID;
  }

  get authPaths() {
    return authPaths;
  }
}
