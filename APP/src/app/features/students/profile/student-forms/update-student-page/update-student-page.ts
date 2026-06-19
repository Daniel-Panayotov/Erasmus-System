import { Component, inject, input, signal } from '@angular/core';
import { StudentForm } from '../student-form/student.form';
import { StudentAPI } from '../../../services/student.api.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { StudentBase, StudentData } from '../../../models/student.form.models';
import { TreeValidationResult } from '@angular/forms/signals';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-student-page',
  imports: [StudentForm],
  templateUrl: './update-student-page.html',
  styleUrl: './update-student-page.css',
})
export class UpdateStudentPage {
  private studentAPI = inject(StudentAPI);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  studentID = input.required<number>();

  serverErrors = signal<TreeValidationResult | null>(null);

  studentResource = rxResource({
    params: () => ({ studentID: this.studentID() }),
    stream: ({ params }) =>
      this.studentAPI.GetStudent(params.studentID).pipe(map((v) => v.body as StudentBase)),
  });

  updateStudent(data: StudentData) {
    this.studentAPI.UpdateStudent(this.studentID(), data).subscribe({
      next: () => this.router.navigate(['..'], { relativeTo: this.route }),
      error(err: HttpErrorResponse) {
        console.log(err);
      },
    });
  }
}
