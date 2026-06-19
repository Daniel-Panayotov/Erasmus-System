import { Component, inject, input, signal } from '@angular/core';
import { StudentForm } from '../student-form/student.form';
import { StudentAPI } from '../../../services/student.api.service';
import { StudentData } from '../../../models/student.form.models';
import { TreeValidationResult } from '@angular/forms/signals';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-create-student-page',
  imports: [StudentForm],
  templateUrl: './create-student-page.html',
  styleUrl: './create-student-page.css',
})
export class CreateStudentPage {
  private studentAPI = inject(StudentAPI);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  userID = input.required<number>();

  serverErrors = signal<TreeValidationResult | null>(null);

  createStudent(data: StudentData) {
    this.studentAPI.CreateStudent(this.userID(), data).subscribe({
      next: () => this.router.navigate(['..'], { relativeTo: this.route }),
      error(err: HttpErrorResponse) {},
    });
  }
}
