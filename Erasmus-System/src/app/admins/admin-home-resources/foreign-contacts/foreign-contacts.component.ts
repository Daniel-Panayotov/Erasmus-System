import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AdminViewComponent } from 'src/app/shared/components/admin-view/admin-view.component';
import { PaginationComponent } from 'src/app/shared/components/pagination/pagination.component';
import { PopupAdminFormComponent } from 'src/app/shared/components/popup-admin-form/popup-admin-form.component';
import { adminSectionString } from 'src/app/types/apiEnvironmentTypes';

@Component({
  selector: 'app-foreign-contacts',
  standalone: true,
  imports: [PaginationComponent, PopupAdminFormComponent, AdminViewComponent],
  templateUrl: './foreign-contacts.component.html',
  styleUrl: './foreign-contacts.component.css',
})
export class ForeignContactsComponent {
  adminModule: adminSectionString = 'foreignContacts';
  sectionName: string = 'Foreign Contacts';

  searchForm = {} as FormGroup;
  popupForm = {} as FormGroup;

  receiveSearchForm(searchForm: FormGroup) {
    this.searchForm = searchForm;
  }

  receivePopupForm(popupForm: FormGroup) {
    this.popupForm = popupForm;
  }
}
