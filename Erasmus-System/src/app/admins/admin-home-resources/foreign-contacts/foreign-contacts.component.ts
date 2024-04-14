import { Component, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PaginationService } from 'src/app/services/pagination.service';
import { AdminViewComponent } from 'src/app/shared/components/admin-view/admin-view.component';
import { PaginationComponent } from 'src/app/shared/components/pagination/pagination.component';
import { PopupAdminFormComponent } from 'src/app/shared/components/popup-admin-form/popup-admin-form.component';
import { generalAdminComponentInputs } from 'src/app/types/adminDocs';
import { adminSectionString } from 'src/app/types/apiEnvironmentTypes';

@Component({
  selector: 'app-foreign-contacts',
  standalone: true,
  imports: [PaginationComponent, PopupAdminFormComponent, AdminViewComponent],
  templateUrl: './foreign-contacts.component.html',
  styleUrl: './foreign-contacts.component.css',
})
export class ForeignContactsComponent {
  paginationService = inject(PaginationService);

  adminModule: adminSectionString = 'foreignContacts';
  sectionName: string = 'Foreign Contacts';

  searchForm = {} as FormGroup;
  popupForm = {} as FormGroup;

  populateListOfClickedData = () => {};

  generalComponentInputs: generalAdminComponentInputs = {
    adminModule: this.adminModule,
    sectionName: this.sectionName,
    changePage: async (pageNumber: number, searching: boolean) => {
      await this.changePage.bind(this)(pageNumber, searching);
    },
  };

  async changePage(pageNumber: number, searching: boolean): Promise<void> {
    await this.paginationService.changePage.bind(
      this.paginationService, // original context
      pageNumber,
      searching,
      this.searchForm.value,
      this.adminModule
    )();

    this.populateListOfClickedData();
  }

  receiveSearchForm(searchForm: FormGroup) {
    this.searchForm = searchForm;
  }

  receivePopupForm(popupForm: FormGroup) {
    this.popupForm = popupForm;
  }

  receivePopulateFunction(populateFunction: () => void) {
    this.populateListOfClickedData = populateFunction;
  }
}
