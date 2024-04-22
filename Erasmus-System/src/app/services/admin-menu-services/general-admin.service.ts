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
import { ApiService } from '../general-services/api.service';

@Injectable({
  providedIn: 'root',
})
export class GeneralAdminService {
  private deletionService = inject(DeletionService);
  private popupService = inject(AdminPopupService);
  private paginationService = inject(PaginationService);
  private apiService = inject(ApiService);

  buttonsBasicDataCollection: ButtonBasicDataCollection = {
    deleteRecord: {
      text: 'Delete',
      altText: null,
      showAltText: () => false,
      bgColorClass: 'bg-red',
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
      bgColorClass: 'bg-green',
    },
    approveApplication: {
      text: 'Approve',
      altText: null,
      showAltText: () => false,
      bgColorClass: 'bg-green',
    },
    rejectApplication: {
      text: 'Reject',
      altText: null,
      showAltText: () => false,
      bgColorClass: 'bg-red',
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
    approveApplication:
      (componentInputs: generalAdminComponentInputs) =>
      async (data: ButtonHandlerArguments) => {
        await this.apiService.updateOne(
          data.cookie,
          { status: 'approved' },
          data.adminRecord._id,
          componentInputs.adminModule
        );

        await componentInputs.changePage(
          1,
          this.paginationService.isSearchActive
        );
      },
    rejectApplication:
      (componentInputs: generalAdminComponentInputs) =>
      async (data: ButtonHandlerArguments) => {
        await this.apiService.updateOne(
          data.cookie,
          { status: 'rejected' },
          data.adminRecord._id,
          componentInputs.adminModule
        );

        await componentInputs.changePage(
          1,
          this.paginationService.isSearchActive
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
      actions: {
        editButtonIndex: -1,
        buttons: [],
      },
    };

    for (let i = 0; i < buttonsIdentifiers.length; i++) {
      const buttonIdentifier = buttonsIdentifiers[i];

      if (buttonIdentifier == 'togglePopup')
        tableButtonsData.actions.editButtonIndex = i;

      const buttonData: TableButtonData = {
        ...this.buttonsBasicDataCollection[buttonIdentifier],
        handler:
          this.buttonHandlersCollection[buttonIdentifier](componentInputs),
      };

      tableButtonsData.actions.buttons.push(buttonData);
    }

    return tableButtonsData;
  }
}
