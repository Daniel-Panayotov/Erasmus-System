import { Component, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PaginationComponent } from 'src/app/shared/components/pagination/pagination.component';
import { PopupAdminFormComponent } from 'src/app/shared/components/popup-admin-form/popup-admin-form.component';
import { AdminViewComponent } from 'src/app/shared/components/admin-view/admin-view.component';
import { adminSectionString } from 'src/app/types/apiEnvironmentTypes';
import { PaginationService } from 'src/app/services/pagination.service';
import { generalAdminComponentInputs } from 'src/app/types/adminDocs';
import { GeneralAdminService } from 'src/app/services/admin-menu-services/general-admin.service';
import { ButtonIdentifier } from 'src/app/types/adminTableButtons';

@Component({
  selector: 'app-faculties',
  standalone: true,
  imports: [PaginationComponent, PopupAdminFormComponent, AdminViewComponent],
  templateUrl: './faculties.component.html',
  styleUrl: './faculties.component.css',
})
export class FacultiesComponent {
  private paginationService = inject(PaginationService);
  private adminService = inject(GeneralAdminService);

  adminModule: adminSectionString = 'faculties';
  sectionName: string = 'Faculties';

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

  tableButtonsIdentifiers: ButtonIdentifier[] = ['togglePopup', 'deleteRecord'];

  tableButtonsData = this.adminService.generateTableButtonsData(
    'th-15',
    this.generalComponentInputs,
    this.tableButtonsIdentifiers
  );

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

  receivePopumForm(popupForm: FormGroup) {
    this.popupForm = popupForm;
  }

  receivePopulateFunction(populateFunction: () => void) {
    this.populateListOfClickedData = populateFunction;
  }
}
