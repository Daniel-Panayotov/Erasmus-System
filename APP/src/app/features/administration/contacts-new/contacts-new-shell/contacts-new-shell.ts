import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ContactDraftStore } from '../contact-draft.store';
import { administrationPaths } from '../../administration.paths';
import { TabGroup } from '../../../../shared/components/tab-group/tab-group';

@Component({
  selector: 'app-contacts-new-shell',
  imports: [RouterOutlet, TabGroup],
  templateUrl: './contacts-new-shell.html',
  providers: [ContactDraftStore],
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
