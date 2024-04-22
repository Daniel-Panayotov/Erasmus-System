import { Injectable, inject } from '@angular/core';
import { PaginationService } from '../pagination.service';
import {
  environment,
  listDocProperties,
} from 'src/app/shared/environments/environment';
import { validatedFormValues } from 'src/app/types/popupFormValues';
import { CookieService } from 'ngx-cookie-service';
import { FormGroup } from '@angular/forms';
import { apiModuleString } from 'src/app/types/apiEnvironmentTypes';
import { ApiService } from '../general-services/api.service';
import { ValidationService } from '../general-services/validation.service';

@Injectable({
  providedIn: 'root',
})
export class AdminPopupService {
  private paginationService = inject(PaginationService);
  private cookieService = inject(CookieService);
  private apiService = inject(ApiService);
  private validationService = inject(ValidationService);

  private _errorMessage: string = '';
  private _isPopupVisible: boolean = false;
  private _isPopupEdit: boolean = false;
  private _popupIndex: number = 0;

  resetState(): void {
    this._errorMessage = '';
    this._isPopupVisible = false;
    this._isPopupEdit = false;
    this._popupIndex = 0;
  }

  /* Index is set to differentiate betweens clicked buttons.
   * Allow only the clicked button to hide the popup.
   * Index for "Add" = -1 | Indexes for "Edit" >= 0
   */
  togglePopup(
    isEdit: boolean,
    i: number,
    popupForm: FormGroup,
    adminModule: apiModuleString
  ): void {
    if (!this.isPopupVisible) {
      this._popupIndex = i;
    }
    if (this.isPopupVisible && i != this.popupIndex) {
      return;
    }

    //clear state
    popupForm.reset();

    //set form values if in "Edit" mode
    if (isEdit && !this.isPopupVisible) {
      const values = this.generateValues(i, adminModule);

      popupForm.setValue(values);
    }

    //clear state
    this._errorMessage = '';
    this._isPopupEdit = isEdit;
    this._isPopupVisible = !this.isPopupVisible;
  }

  async popupFormAction(
    adminModule: apiModuleString,
    popupForm: FormGroup
  ): Promise<void> {
    const { validatedValues, error } =
      this.validationService.validateFormValues(popupForm, adminModule);

    //check if theres an error
    if (error) {
      return;
    }

    const authCookie = this.cookieService.get(environment.authCookieName);

    // Based on wether popup is edit, we call update/create function
    try {
      switch (this.isPopupEdit) {
        case true:
          await this.apiService.updateOne(
            authCookie,
            validatedValues,
            this.paginationService.documents[this.popupIndex]._id,
            adminModule
          );

          break;

        case false:
          await this.apiService.createOne(
            authCookie,
            validatedValues,
            adminModule
          );

          break;
      }

      // hide popup
      this.togglePopup(
        this._isPopupEdit,
        this._popupIndex,
        popupForm,
        adminModule
      );
    } catch (err: any) {
      const { message } = await err.json();
      this._errorMessage = message;
    }
  }

  /* Generate an object of values from given document
   */
  private generateValues(i: number, adminModule: apiModuleString) {
    const values: validatedFormValues = {};
    const document = this.paginationService.documents[i];

    const docProperties = listDocProperties[adminModule];
    for (let propertyName in docProperties) {
      // if property is reference, index value with isRef string
      if (docProperties[propertyName].isRef) {
        values[propertyName] =
          document[propertyName][docProperties[propertyName].isRef!.mainProp];
      } else {
        values[propertyName] = document[propertyName];
      }
    }

    return values;
  }

  // getters
  get isPopupVisible(): boolean {
    return this._isPopupVisible;
  }
  get isPopupEdit(): boolean {
    return this._isPopupEdit;
  }
  get popupIndex(): number {
    return this._popupIndex;
  }
  get popupError(): string {
    return this._errorMessage;
  }
}
