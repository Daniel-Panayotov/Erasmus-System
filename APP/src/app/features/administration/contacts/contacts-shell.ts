import { Component, computed, signal } from '@angular/core';
import { administrationPaths } from '../administration.paths';
import { PageShell } from '../../../shared/components/page-shell/page-shell';

@Component({
  selector: 'app-contacts-shell',
  imports: [PageShell],
  template: '<app-page-shell [tabs]="tabs()" />',
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
