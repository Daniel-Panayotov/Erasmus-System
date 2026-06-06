import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { userModel } from '../models/userModel';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private http = inject(HttpClient);

  private _authState = signal<userModel | null>(null);

  public async login() {}

  public async register() {}

  public async refresh() {}

  get authState() {
    return this._authState.asReadonly();
  }

  get isAuthenticated() {
    return computed(() => !!this._authState());
  }
}
