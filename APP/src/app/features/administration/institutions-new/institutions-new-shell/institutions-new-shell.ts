import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TabGroup } from '../../../../shared/components/tab-group/tab-group';
import { administrationPaths } from '../../administration.paths';

@Component({
  selector: 'app-institutions-new-shell',
  imports: [RouterOutlet, TabGroup],
  templateUrl: './institutions-new-shell.html',
})
export class InstitutionsNewShell {
  tabs = [
    {
      label: 'Create institution',
      url: administrationPaths.institutions_new.create,
    },
    {
      label: 'Add Contacts',
      url: administrationPaths.institutions_new.contacts,
    },
    {
      label: 'Add Faculties',
      url: administrationPaths.institutions_new.faculties,
    },
  ];
}
