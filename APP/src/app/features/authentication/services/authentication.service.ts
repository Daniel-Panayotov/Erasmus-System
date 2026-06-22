import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { UserData, SafeUser } from '../models/user.model';
import { catchError, switchMap, take, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private http = inject(HttpClient);

  private _state = signal<SafeUser | null>(null);

  public login(data: UserData) {
    const url = 'auth/login';

    return this.http.post(url, data, { observe: 'response', credentials: 'include' }).pipe(
      switchMap(() => this.refresh()),
      take(1),
    );
  }

  public register(data: UserData) {
    const url = 'auth/register';

    return this.http.post(url, data, { observe: 'response', credentials: 'include' }).pipe(
      switchMap(() => this.refresh()),
      take(1),
    );
  }

  public logout() {
    const url = 'auth/logout';

    return this.http.post(url, null, { observe: 'response', credentials: 'include' }).pipe(
      tap(() => {
        this._state.set(null);
      }),
      take(1),
    );
  }

  public refresh() {
    const url = 'auth/refresh';

    return this.http
      .post<SafeUser>(url, null, { observe: 'response', credentials: 'include' })
      .pipe(
        tap((v) => {
          this._state.set(v.body);
        }),
        catchError((err: HttpErrorResponse) => {
          this._state.set(null);
          return throwError(() => err);
        }),
        take(1),
      );
  }

  get state() {
    return this._state.asReadonly();
  }

  get authenticated() {
    return computed(() => !!this._state());
  }
}
