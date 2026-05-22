import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private http = inject(HttpClient)


  public async login() {
  }
  
  public async register() {
    
  }
  
  public async refresh() {
    this.http.get("", {})
    
  }
}
