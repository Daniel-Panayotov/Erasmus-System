import { Component, computed, inject, Signal, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../../features/authentication/services/authentication.service';
import { providedIcons } from '../../shared/utils/icon.provider';
import { HorizontalNavigation } from '../../shared/components/horizontal-navigation/horizontal-navigation';
import { NavIcon } from '../../shared/models/horizontal-navigation.model';
import { studentsTree } from '../../features/students/student.paths';
import { authentication } from '../../features/authentication/authentication.paths';
import { administration } from '../../features/administration/administration.paths';

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
      route: studentsTree.studentID(this.studentID!.toString()).applications.create.segments,
      name: 'Apply',
      float: 'left',
    },
    {
      iconName: providedIcons.heroClipboard,
      route: studentsTree.studentID(this.studentID!.toString()).profile.view.segments,
      name: 'Profile',
      float: 'right',
    },
  ]);

  private notStudentNavIcons: Signal<NavIcon[]> = computed(() => [
    {
      iconName: providedIcons.heroUser,
      route: studentsTree.new.userID(this.auth.state()?.userID!).profile.segments,
      name: 'Create profile',
      float: 'left',
    },
  ]);

  public profileNavIcons: Signal<NavIcon[]> = computed(() => {
    const items: NavIcon[] = [
      {
        iconName: providedIcons.heroClipboard,
        route: administration.contacts.view.segments,
        name: 'Contacts',
        float: 'left',
      },
      {
        iconName: providedIcons.heroClipboard,
        route: administration.institutions.view.segments,
        name: 'Institutions',
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
    else items.push(...this.notStudentNavIcons());

    return items;
  });

  public handleShowChange(change: boolean) {
    this.profileClicked.set(change);
  }

  public async logout() {
    this.auth.logout().subscribe((x) => {
      this.router.navigate(authentication.login.segments);
    });
  }

  get authenticated() {
    return this.auth.authenticated;
  }

  get studentID() {
    return this.auth.state()?.student?.studentID;
  }

  get authPaths() {
    return authentication;
  }
}
