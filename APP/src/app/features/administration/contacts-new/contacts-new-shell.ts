import { Component } from '@angular/core';
import { ContactDraftStore } from './contact-draft.store';
import { administrationPaths } from '../administration.paths';
import { PageShell } from '../../../shared/components/page-shell/page-shell';

@Component({
  selector: 'app-contacts-new-shell',
  imports: [PageShell],
  providers: [ContactDraftStore],
  template: '<app-page-shell [tabs]="tabs" />',
})
export class ContactsNewShell {
  tabs = [
    {
      label: 'Create contact',
      url: administrationPaths.contacts_new.create,
    },
    {
      label: 'Add institutions',
      url: administrationPaths.contacts_new.institutions,
    },
  ];
}
