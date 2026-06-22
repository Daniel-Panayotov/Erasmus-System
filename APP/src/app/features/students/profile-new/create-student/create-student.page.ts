import { Component, inject, input, signal } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { StudentData } from '../../models/student.model';
import { TreeValidationResult } from '@angular/forms/signals';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { StudentForm } from '../../shared/student-form/student.form';

@Component({
  selector: 'app-create-student-page',
  imports: [StudentForm],
  templateUrl: './create-student.page.html',
  styleUrl: './create-student.page.css',
})
export class CreateStudentPage {
  private studentAPI = inject(StudentService);
  private router = inject(Router);

  userID = input.required<number>();

  serverErrors = signal<TreeValidationResult | null>(null);

  createStudent(data: StudentData) {
    this.studentAPI.CreateStudent(this.userID(), data).subscribe({
      next: () => this.router.navigate(['/']),
      error(err: HttpErrorResponse) {},
    });
  }
}
