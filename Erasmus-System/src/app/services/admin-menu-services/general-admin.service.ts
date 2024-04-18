import { Injectable, inject } from '@angular/core';
import { DeletionService } from '../deletion.service';
import { AdminPopupService } from './admin-popup.service';
import { PaginationService } from '../pagination.service';
import { generalAdminComponentInputs } from 'src/app/types/adminDocs';
import {
  ButtonBasicDataCollection,
  ButtonHandlerArguments,
  ButtonHandlerCollection,
  ButtonIdentifier,
  TableButtonData,
  TableButtonsData,
} from 'src/app/types/adminTableButtons';
import { widthClass } from 'src/app/types/globalTypes';

@Injectable({
  providedIn: 'root',
})
export class GeneralAdminService {
  deletionService = inject(DeletionService);
  popupService = inject(AdminPopupService);
  paginationService = inject(PaginationService);

  buttonsBasicDataCollection: ButtonBasicDataCollection = {
    deleteRecord: {
      text: 'Delete',
      altText: null,
      showAltText: () => false,
      colorClass: 'bg-red',
    },
    togglePopup: {
      text: 'Edit',
      altText: 'Close',
      showAltText: (i: number) => {
        return this.popupService.isPopupEdit &&
          this.popupService.isPopupVisible &&
          this.popupService.popupIndex == i
          ? true
          : false;
      },
      colorClass: 'bg-green',
    },
  };

  buttonHandlersCollection: ButtonHandlerCollection = {
    deleteRecord:
      (componentInputs: generalAdminComponentInputs) =>
      async (data: ButtonHandlerArguments) => {
        await this.deletionService.onDelete(
          data.adminRecord._id,
          componentInputs.adminModule
        );

        await componentInputs.changePage(
          1,
          this.paginationService.isSearchActive
        );
      },
    togglePopup:
      (componentInputs: generalAdminComponentInputs) =>
      (data: ButtonHandlerArguments) => {
        this.popupService.togglePopup(
          data.isPopupEdit,
          data.index,
          data.adminPopupForm,
          componentInputs.adminModule
        );
      },
  };

  generateTableButtonsData(
    widthClass: widthClass,
    componentInputs: generalAdminComponentInputs,
    buttonsIdentifiers: ButtonIdentifier[]
  ): TableButtonsData {
    const tableButtonsData: TableButtonsData = {
      widthClass,
      actions: [],
    };

    for (let i = 0; i < buttonsIdentifiers.length; i++) {
      const buttonIdentifier = buttonsIdentifiers[i];

      const buttonData: TableButtonData = {
        ...this.buttonsBasicDataCollection[buttonIdentifier],
        handler:
          this.buttonHandlersCollection[buttonIdentifier](componentInputs),
      };

      tableButtonsData.actions.push(buttonData);
    }

    return tableButtonsData;
  }
}
