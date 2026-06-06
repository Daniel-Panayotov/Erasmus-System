import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Router } from '@angular/router';

@Service()
export class StudentApiService {
  private http = inject(HttpClient);
  private router = inject(Router);

  public GetStudent(studentID: number) {
    const url: string = this.router
      .createUrlTree(['students', 'get'], { queryParams: { studentID: studentID } })
      .toString();

    return this.http.get(url);
  }

  x(body: any) {
    return this.http.post('', body);
  }
}
