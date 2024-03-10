import { Injectable } from '@angular/core';
import { PaginationService } from '../pagination.service';
import { docProperties } from 'src/app/types/docProperties';
import { getRoute } from 'src/app/shared/environments/apiEnvironment';
import { environment } from 'src/app/shared/environments/environment';
import { popupFormValues } from 'src/app/types/popupFormValues';
import { CookieService } from 'ngx-cookie-service';
import { searchValue } from 'src/app/types/searchFormValue';
import { FormGroup } from '@angular/forms';
import {
  facultiesRegex,
  fieldsRegex,
} from 'src/app/shared/environments/validationEnvironment';

@Injectable({
  providedIn: 'root',
})
export class AdminPopupService {
  private _popupError: string = '';
  private _isPopupVisible: boolean = false;
  private _isPopupEdit: boolean = false;
  private _popupIndex: number = 0;

  constructor(
    private paginationService: PaginationService,
    private cookieService: CookieService
  ) {}

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

    this._popupError = '';
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
    const docProperty = this.docProperties[adminModule];

    for (let propertyName in docProperty) {
      //expand validation
      if (!formValues[propertyName]) {
        this._popupError = docProperty[propertyName].error;
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
      this._popupError = message;
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

    const docProperty = this.docProperties[adminModule];
    for (let property in docProperty) {
      values[property] = document[property];
    }

    return values;
  }

  // structure of documents with their properties, errors and regex
  private _docProperties: docProperties = {
    fields: {
      code: {
        name: 'Code',
        error: 'Code must be 3 digits',
        regex: fieldsRegex.code,
      },
      name: {
        name: 'Name',
        error: 'Invalid Name',
        regex: fieldsRegex.fieldName,
      },
    },
    faculties: {
      name: {
        name: 'Name',
        error: 'Faculty Name must be at least 4 characters',
        regex: facultiesRegex.facultyName,
      },
      coordinator: {
        name: 'Coordinator',
        error: 'Invalid Coordinator Name',
        regex: facultiesRegex.personName,
      },
    },
  };

  // getters
  get docProperties(): docProperties {
    return this._docProperties;
  }
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
    return this._popupError;
  }
}
