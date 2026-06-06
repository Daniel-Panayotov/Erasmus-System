import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Student } from '../models/student.form.models';

@Service()
export class StudentApiService {
  private http = inject(HttpClient);

  public GetStudent(studentID: number) {
    const url = `students/get?studentID=${studentID}`;

    return this.http.get<Student>(url);
  }

  x(body: any) {
    return this.http.post('', body);
  }
}
