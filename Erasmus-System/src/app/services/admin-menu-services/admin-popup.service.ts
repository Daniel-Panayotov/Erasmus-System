import { Injectable, inject } from '@angular/core';
import { PaginationService } from '../pagination.service';
import { getRoute } from 'src/app/shared/environments/apiEnvironment';
import {
  environment,
  listDocProperties,
} from 'src/app/shared/environments/environment';
import {
  popupFormValues,
  validatedFormValues,
} from 'src/app/types/popupFormValues';
import { CookieService } from 'ngx-cookie-service';
import { searchValue } from 'src/app/types/searchFormValue';
import { FormGroup } from '@angular/forms';
import { adminSectionString } from 'src/app/types/apiEnvironmentTypes';

@Injectable({
  providedIn: 'root',
})
export class AdminPopupService {
  private paginationService = inject(PaginationService);
  private cookieService = inject(CookieService);

  private _errorMessage: string = '';
  private _popupError: boolean = false;
  private _isPopupVisible: boolean = false;
  private _isPopupEdit: boolean = false;
  private _popupIndex: number = 0;

  resetState(): void {
    this._popupError = false;
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
    popupFieldForm: FormGroup,
    adminModule: string
  ): void {
    if (!this.isPopupVisible) {
      this._popupIndex = i;
    }
    if (this.isPopupVisible && i != this.popupIndex) {
      return;
    }

    //clear state
    popupFieldForm.reset();

    //set form values if in "Edit" mode
    if (isEdit && !this.isPopupVisible) {
      const values = this.generateValues(i, adminModule);

      popupFieldForm.setValue(values);
    }

    //clear state
    this._popupError = false;
    this._errorMessage = '';
    this._isPopupEdit = isEdit;
    this._isPopupVisible = !this.isPopupVisible;
  }

  async popupFormAction(
    adminModule: adminSectionString,
    popupFieldForm: FormGroup,
    searchForm: FormGroup
  ): Promise<void> {
    const formValues: popupFormValues = popupFieldForm.value;
    const values: validatedFormValues = {};

    /* Index an object to get value names, to access the form values
     * Validate form values
     * Collect the form values if valid in "values"
     */
    const docProperties = listDocProperties[adminModule];

    for (let propertyName in docProperties) {
      if (
        !docProperties[propertyName].regex.exec(
          formValues[propertyName] as string
        )
      ) {
        this._popupError = true;
        break;
      }
      values[propertyName] = formValues[propertyName] as string;
    }

    //check if theres an error
    if (this._popupError) {
      return;
    }

    const authCookie = this.cookieService.get(environment.authCookieName);

    // Based on wether popup is edit, we call update/create function
    try {
      switch (this.isPopupEdit) {
        case true:
          await this.updateOne(
            authCookie,
            values,
            this.paginationService.documents[this.popupIndex]._id,
            adminModule
          );

          break;

        case false:
          await this.createOne(authCookie, values, adminModule);

          break;
      }

      // change the page to show edit/created document
      await this.paginationService.changePage(
        this.paginationService.page,
        this.paginationService.isSearchActive,
        searchForm.value,
        adminModule
      );

      // hide popup
      this.togglePopup(
        this._isPopupEdit,
        this._popupIndex,
        popupFieldForm,
        adminModule
      );
    } catch (err: any) {
      const { message } = await err.json();
      this._errorMessage = message;
    }
  }

  /* Index an obj with the "adminModule" string, then specify the action
   * Receive Url and fetch with it
   */
  private async updateOne(
    cookie: string,
    data: validatedFormValues,
    id: string,
    adminModule: adminSectionString
  ): Promise<Response> {
    const options = {
      method: 'PATCH',
      headers: {
        [environment.authCookieName]: cookie,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    return fetch(getRoute(adminModule, 'updateOne') + `/${id}`, options).then(
      (res) => {
        if (!res.ok) {
          throw res;
        }
        return res;
      }
    );
  }

  /* Index an obj with the "adminModule" string, then specify the action
   * Receive Url and fetch with it
   */
  private async createOne(
    cookie: string,
    data: validatedFormValues,
    adminModule: adminSectionString
  ): Promise<Response> {
    const options = {
      method: 'POST',
      headers: {
        [environment.authCookieName]: cookie,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    return fetch(getRoute(adminModule, 'createOne'), options).then((res) => {
      if (!res.ok) {
        throw res;
      }
      return res;
    });
  }

  /* Generate an object of values from given document
   */
  private generateValues(i: number, adminModule: string) {
    const values: validatedFormValues = {};
    const document = this.paginationService.documents[i];

    const docProperties = listDocProperties[adminModule];
    for (let propertyName in docProperties) {
      // if property is reference, index value with isRef string
      if (docProperties[propertyName].isRef) {
        values[propertyName] =
          document[propertyName][
            docProperties[propertyName].isRef!.properties.propsList[0]
          ];
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
