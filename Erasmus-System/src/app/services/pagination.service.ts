import { Injectable } from '@angular/core';
import { environment } from '../shared/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { getSelectRegex } from '../shared/environments/validationEnvironment';
import { searchValue } from '../types/searchFormValue';
import { getRoute } from '../shared/environments/apiEnvironment';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  private _documents: any[] = []; //variable to hold the documents
  //pagination values
  private _pageCountToIterate: number = 0;
  private _pageCount: number = 0;
  private _page: number = 1;
  //search values
  private _isSearchActive: boolean = false;
  private _searchParams: any = {};

  constructor(private cookieService: CookieService) {}

  resetState() {
    this._documents = [];
  }

  // function to call
  async changePage(
    pageNumber: number,
    searching: boolean,
    searchParams: searchValue,
    section: string
  ): Promise<void> {
    if (pageNumber < 1 || (pageNumber > this._pageCount && pageNumber != 1)) {
      return;
    }
    this._page = pageNumber;
    try {
      await this.getFields(searching, searchParams, section);
    } catch (err) {}
  }

  private async getFields(
    searching: boolean,
    searchParams: searchValue,
    section: string
  ): Promise<void> {
    const authCookie = this.cookieService.get(environment.authCookieName);
    this._page = searching == this._isSearchActive ? this._page : 1;
    let data;
    let response;

    /* if searchMode changes, start from page 1, otherwise use given page.
     * Set search params at page 1, if search is Active.
     * Continue with set params if page != 1
     */

    try {
      switch (searching) {
        case true:
          if (this._page == 1) {
            this._searchParams = searchParams;
          }
          const { select, search } = this._searchParams;

          //validate unput
          if (
            !getSelectRegex(section).exec(select) ||
            typeof search != 'string'
          ) {
            break;
          }

          response = await this.getPageByParam(
            authCookie,
            this._searchParams,
            this._page,
            section
          );

          data = await response.json();
          break;
        case false:
          response = await this.getPage(authCookie, this._page, section);

          data = await response.json();

          break;
      }
      const { docs, docCount } = data;

      this._documents = docs;

      const pages = Math.ceil(docCount / 10);

      this.calcPages(pages);
    } catch (err) {}

    this._isSearchActive = searching;
  }

  private calcPages(pages: number): void {
    /* Calculate number for numbered page buttons to iterate over.
     * Have 4 or less page options on each side of main page, if possible
     * x: can be 5 or less (includes current page)
     * y: can be 4 or less
     */

    this._pageCount = pages;

    const x = this._page < 6 ? this._page : 5;
    const y = pages - x < 5 ? pages - x : 4;

    this._pageCountToIterate = x + y;
  }

  /* Api requests
   * Indexes an object of functions, from given string, to return base url
   */

  private async getPage(
    cookie: string,
    page: number,
    section: string
  ): Promise<Response> {
    const options = {
      method: 'POST',
      headers: {
        [environment.authCookieName]: cookie,
      },
    };

    const url = getRoute(section, 'getPage') + `/${page}`;

    return fetch(url, options).then((res) => {
      if (!res.ok) {
        throw res;
      }
      return res;
    });
  }

  private async getPageByParam(
    cookie: string,
    data: { select: string; search: string },
    page: number,
    section: string
  ): Promise<Response> {
    const options = {
      method: 'POST',
      headers: {
        [environment.authCookieName]: cookie,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    const url = getRoute(section, 'getByParam') + `/${page}`;

    return fetch(url, options).then((res) => {
      if (!res.ok) {
        throw res;
      }
      return res;
    });
  }

  /* Setup getters */

  get documents(): [any] {
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
