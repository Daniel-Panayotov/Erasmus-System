import { Component, computed, inject, Signal, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../../features/authentication/services/authentication.service';
import { providedIcons } from '../../shared/utils/icon.provider';
import { HorizontalNavigation } from '../../shared/components/horizontal-navigation/horizontal-navigation';
import { NavIcon } from '../../shared/models/horizontal-navigation.model';
import { studentPaths } from '../../features/students/student.paths';
import { authPaths } from '../../features/authentication/authentication.paths';
import { administrationPaths } from '../../features/administration/administration.paths';

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
      iconName: providedIcons.heroClipboard,
      route: studentPaths.applications(this.studentID!.toString()).create,
      name: 'Apply',
      float: 'left',
    },
    {
      iconName: providedIcons.heroClipboard,
      route: studentPaths.profiles(this.studentID!.toString()).view,
      name: 'Profile',
      float: 'right',
    },
  ]);

  private notStudentNavIcons: NavIcon[] = [
    {
      iconName: providedIcons.heroUser,
      route: studentPaths.newProfile(this.auth.state()?.userID!).profile,
      name: 'Create profile',
      float: 'left',
    },
  ];

  public profileNavIcons: Signal<NavIcon[]> = computed(() => {
    const items: NavIcon[] = [
      {
        iconName: providedIcons.heroClipboard,
        route: administrationPaths.contacts.create,
        name: 'Create contact',
        float: 'left',
      },
      {
        iconName: providedIcons.heroClipboard,
        route: administrationPaths.contacts.view,
        name: 'Contacts',
        float: 'left',
      },
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
