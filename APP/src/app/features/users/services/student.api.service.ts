import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { StudentBase, StudentData } from '../models/student.form.models';
import { take } from 'rxjs';

@Service()
export class StudentAPI {
  private http = inject(HttpClient);

  public GetStudent(userID: number) {
    const url = `students/get?userID=${userID}`;

    return this.http
      .get<StudentBase>(url, { observe: 'response', credentials: 'include' })
      .pipe(take(1));
  }

  public CreateStudent(userID: number, body: StudentData) {
    const url = `students/create?userID=${userID}`;

    return this.http.post(url, body, { observe: 'response', credentials: 'include' }).pipe(take(1));
  }

  public UpdateStudent(studentID: number, body: StudentData) {
    const url = `students/update?studentID=${studentID}`;

    return this.http.post(url, body, { observe: 'response', credentials: 'include' }).pipe(take(1));
  }
}
