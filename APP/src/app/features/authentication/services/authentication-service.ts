import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { UserData, UserToken } from '../models/userModel';
import { catchError, switchMap, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private http = inject(HttpClient);

  private _state = signal<UserToken | null>(null);

  public login(data: UserData) {
    const url = 'auth/login';

    return this.http
      .post(url, data, { observe: 'response', credentials: 'include' })
      .pipe(switchMap(() => this.refresh()));
  }

  public register(data: UserData) {
    const url = 'auth/register';

    return this.http
      .post(url, data, { observe: 'response', credentials: 'include' })
      .pipe(switchMap(() => this.refresh()));
  }

  public logout() {
    const url = 'auth/logout';

    return this.http.post(url, null, { observe: 'response', credentials: 'include' }).pipe(
      tap(() => {
        this._state.update(() => null);
      }),
    );
  }

  public refresh() {
    const url = 'auth/refresh';

    return this.http
      .post<UserToken>(url, null, { observe: 'response', credentials: 'include' })
      .pipe(
        tap((v) => {
          this._state.update(() => v.body);
        }),
        catchError((err: HttpErrorResponse) => {
          this._state.update(() => null);
          return throwError(() => err);
        }),
      );
  }

  get state() {
    return this._state.asReadonly();
  }

  get authenticated() {
    return computed(() => !!this._state());
  }
}
