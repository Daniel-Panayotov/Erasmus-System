import { Injectable, inject } from '@angular/core';
import { environment } from '../shared/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { getSelectRegex } from '../shared/environments/validationEnvironment';
import { searchValue } from '../types/searchFormValue';
import { adminRecordUnion } from '../types/adminDocs';
import { apiModuleString } from '../types/apiEnvironmentTypes';
import { ApiService } from './general-services/api.service';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  private cookieService = inject(CookieService);
  private apiService = inject(ApiService);

  private _documents: adminRecordUnion[] = []; //variable to hold the documents
  //pagination values
  private _pageCountToIterate: number = 0;
  private _pageCount: number = 0;
  private _page: number = 1;
  //search values
  private _isSearchActive: boolean = false;
  private _searchParams = {} as searchValue;

  resetState() {
    this._documents = [];
  }

  // function to call
  async changePage(
    pageNumber: number,
    searching: boolean,
    searchParams: searchValue,
    section: apiModuleString
  ): Promise<void> {
    //validate pageNumber

    if (pageNumber < 1 || (pageNumber > this._pageCount && pageNumber != 1)) {
      return;
    }
    //if searchMode changes, start from page 1, otherwise use given page.
    this._page = searching == this._isSearchActive ? pageNumber : 1;

    await this.getFields(searching, searchParams, section);
  }

  private async getFields(
    searching: boolean,
    searchParams: searchValue,
    section: apiModuleString
  ): Promise<void> {
    const authCookie = this.cookieService.get(environment.authCookieName);
    let data;
    let response;

    /* if searchMode changes, start from page 1, otherwise use given page.
     * Set search params at page 1, if search is Active.
     * Continue with set params if page != 1
     */

    try {
      switch (searching) {
        case true:
          //set search params
          if (this._page == 1) {
            this._searchParams = searchParams;
          }
          const { select, search } = this._searchParams;

          //validate unput
          if (typeof select != 'string') {
            break;
          }
          if (
            !getSelectRegex(section).exec(select) ||
            typeof search != 'string'
          ) {
            break;
          }

          //fetch data
          response = await this.apiService.getPageByParam(
            authCookie,
            section,
            this._page,
            this._searchParams
          );

          data = await response.json();
          break;
        case false:
          //fetch data
          response = await this.apiService.getPage(
            authCookie,
            section,
            this._page
          );

          data = await response.json();

          break;
      }

      const { docs, docCount } = data;

      this._documents = docs;

      this.calcPages(docCount);
    } catch (err) {}

    this._isSearchActive = searching;
  }

  private calcPages(docCount: number): void {
    /* Calculate number for numbered page buttons to iterate over.
     * Have 4 or less page options on each side of main page, if possible
     * x: can be 5 or less (includes current page)
     * y: can be 4 or less
     */
    const pages = Math.ceil(docCount / 10);

    this._pageCount = pages;

    const x = this._page < 6 ? this._page : 5;
    const y = pages - x < 5 ? pages - x : 4;

    this._pageCountToIterate = x + y;
  }

  /* Setup getters */

  get documents(): any[] {
    return JSON.parse(JSON.stringify(this._documents));
  }
  get pageCountToIterate(): number {
    return this._pageCountToIterate;
  }
  get pageCount(): number {
    return this._pageCount;
  }
  get page(): number {
    return this._page;
  }
  get isSearchActive(): boolean {
    return this._isSearchActive;
  }
}
