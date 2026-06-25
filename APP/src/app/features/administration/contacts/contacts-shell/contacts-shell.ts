import { Component, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TabGroup } from '../../../../shared/components/tab-group/tab-group';
import { administrationPaths } from '../../administration.paths';

@Component({
  selector: 'app-contacts-shell',
  imports: [RouterOutlet, TabGroup],
  templateUrl: './contacts-shell.html',
})
export class ContactsShell {
  selectedContactID = signal<string | null>(null);

  tabs = computed(() => [
    {
      label: 'Contacts',
      url: administrationPaths.contacts.view,
    },
    {
      label: 'Institutions',
      disabled: this.selectedContactID() == null ? true : false,
      url: administrationPaths.contacts.institutions(this.selectedContactID() ?? ''),
    },
  ]);
}
