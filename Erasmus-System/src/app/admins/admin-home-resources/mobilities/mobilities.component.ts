import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GeneralAdminService } from 'src/app/services/admin-menu-services/general-admin.service';
import { PaginationService } from 'src/app/services/pagination.service';
import { AdminViewComponent } from 'src/app/shared/components/admin-view/admin-view.component';
import { PaginationComponent } from 'src/app/shared/components/pagination/pagination.component';
import { PopupAdminFormComponent } from 'src/app/shared/components/popup-admin-form/popup-admin-form.component';
import { generalAdminComponentInputs } from 'src/app/types/adminDocs';
import { ButtonIdentifier } from 'src/app/types/adminTableButtons';
import { adminModuleString } from 'src/app/types/apiEnvironmentTypes';

@Component({
  selector: 'app-mobilities',
  standalone: true,
  imports: [
    CommonModule,
    AdminViewComponent,
    PaginationComponent,
    PopupAdminFormComponent,
  ],
  templateUrl: './mobilities.component.html',
  styleUrl: './mobilities.component.css',
})
export class MobilitiesComponent {
  private paginationService = inject(PaginationService);
  private adminService = inject(GeneralAdminService);

  adminModule: adminModuleString = 'mobilities';
  sectionName: string = 'Mobilities';

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
    await this.paginationService.changePage(
      pageNumber,
      searching,
      this.searchForm.value,
      this.adminModule
    );

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
