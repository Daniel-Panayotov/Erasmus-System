import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { StudentBase, StudentData } from '../models/student.form.models';

@Service()
export class StudentApiService {
  private http = inject(HttpClient);

  public GetStudent(studentID: number) {
    const url = `students/get?studentID=${studentID}`;

    return this.http.get<StudentBase>(url, { observe: 'response' });
  }

  public CreateStudent(body: StudentData) {
    const url = `students/create`;

    return this.http.post(url, body, { observe: 'response' });
  }

  public UpdateStudent(studentID: number, body: StudentData) {
    const url = `students/update?studentID=${studentID}`;

    return this.http.post(url, body, { observe: 'response' });
  }
}
