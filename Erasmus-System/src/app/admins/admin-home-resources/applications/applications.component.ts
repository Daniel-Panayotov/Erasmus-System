import { Component, ViewChild, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PdfJsViewerModule, PdfJsViewerComponent } from 'ng2-pdfjs-viewer';
import { decodeFromBase64 } from 'pdf-lib';
import { GeneralAdminService } from 'src/app/services/admin-menu-services/general-admin.service';
import { PaginationService } from 'src/app/services/pagination.service';
import { AdminViewComponent } from 'src/app/shared/components/admin-view/admin-view.component';
import { PaginationComponent } from 'src/app/shared/components/pagination/pagination.component';
import { generalAdminComponentInputs } from 'src/app/types/adminDocs';
import { ButtonIdentifier } from 'src/app/types/adminTableButtons';
import { apiModuleString } from 'src/app/types/apiEnvironmentTypes';
import { Base64 } from 'src/app/types/globalTypes';

@Component({
  selector: 'app-applications',
  standalone: true,
  imports: [AdminViewComponent, PaginationComponent, PdfJsViewerModule],
  templateUrl: './applications.component.html',
  styleUrl: './applications.component.css',
})
export class ApplicationsComponent {
  private paginationService = inject(PaginationService);
  private adminService = inject(GeneralAdminService);

  @ViewChild('pdfViewer') public pdfViewer = {} as PdfJsViewerComponent;

  adminModule: apiModuleString = 'applications';
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

  tableButtonsIdentifiers: ButtonIdentifier[] = [
    'approveApplication',
    'rejectApplication',
  ];

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

  openPdf = (pdf: Base64) => {
    const pdfBytes = decodeFromBase64(pdf);
    this.pdfViewer.pdfSrc = pdfBytes;
    this.pdfViewer.refresh();
  };

  receiveSearchForm(searchForm: FormGroup) {
    this.searchForm = searchForm;
  }

  receivePopulateFunction(populateFunction: () => void) {
    this.populateListOfClickedData = populateFunction;
  }
}
