import { Injectable } from '@angular/core';
import { PaginationService } from '../pagination.service';
import { getRoute } from 'src/app/shared/environments/apiEnvironment';
import {
  environment,
  listDocProperties,
} from 'src/app/shared/environments/environment';
import { popupFormValues } from 'src/app/types/popupFormValues';
import { CookieService } from 'ngx-cookie-service';
import { searchValue } from 'src/app/types/searchFormValue';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class AdminPopupService {
  private _errorMessage: string = '';
  private _popupError: boolean = false;
  private _isPopupVisible: boolean = false;
  private _isPopupEdit: boolean = false;
  private _popupIndex: number = 0;

  constructor(
    private paginationService: PaginationService,
    private cookieService: CookieService
  ) {}

  resetState(): void {
    this._popupError = false;
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

    popupFieldForm.reset();

    if (isEdit && !this.isPopupVisible) {
      const values = this.generateValues(i, adminModule);
      popupFieldForm.setValue(values);
    }

    this._popupError = false;
    this._isPopupEdit = isEdit;
    this._isPopupVisible = !this.isPopupVisible;
  }

  async popupFormAction(
    adminModule: string,
    popupFieldForm: FormGroup,
    searchForm: FormGroup
  ): Promise<void> {
    const formValues: popupFormValues = popupFieldForm.value;
    const values: any = {};

    /* Index an object to get value names, to access the form values
     * Validate form values
     * Collect the form values if valid
     */
    const docProperties = listDocProperties[adminModule];

    for (let propertyName in docProperties) {
      //expand validation
      if (
        !docProperties[propertyName].regex.exec(
          formValues[propertyName] as string
        )
      ) {
        this._popupError = true;
        break;
      }
      values[propertyName] = formValues[propertyName];
    }

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
        searchForm.value as searchValue,
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
    data: { name: string; coordinator: string },
    id: string,
    adminModule: string
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
    data: { name: string; coordinator: string },
    adminModule: string
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
    const values: any = {}; // any
    const document = this.paginationService.documents[i];

    const docProperties = listDocProperties[adminModule];
    for (let propertyName in docProperties) {
      // if property is reference, index value with isRef string
      if (docProperties[propertyName].isRef) {
        values[propertyName] =
          document[propertyName][docProperties[propertyName].isRef![0]];
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
