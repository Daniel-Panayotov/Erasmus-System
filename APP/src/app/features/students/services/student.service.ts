import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { NewStudent, StudentBase, StudentData } from '../models/student.model';
import { switchMap, take } from 'rxjs';
import { AuthenticationService } from '../../authentication/services/authentication.service';

@Service()
export class StudentService {
  private http = inject(HttpClient);
  private auth = inject(AuthenticationService);

  public GetStudent(studentID: number) {
    const url = `students/get?studentID=${studentID}`;

    return this.http
      .get<StudentBase>(url, { observe: 'response', credentials: 'include' })
      .pipe(take(1));
  }

  public CreateStudent(userID: number, body: NewStudent) {
    const url = `students/create?userID=${userID}`;

    return this.http.post(url, body, { observe: 'response', credentials: 'include' }).pipe(
      switchMap(() => this.auth.refresh()),
      take(1),
    );
  }

  public UpdateStudent(studentID: number, body: StudentData) {
    const url = `students/update?studentID=${studentID}`;

    return this.http.post(url, body, { observe: 'response', credentials: 'include' }).pipe(take(1));
  }
}
