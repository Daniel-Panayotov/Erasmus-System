import { Component, computed, inject, input, signal } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { NewStudent, StudentData, StudentFormModel } from '../../models/student.model';
import { TreeValidationResult } from '@angular/forms/signals';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { StudentForm } from '../../shared/student-form/student.form';
import { ProfileDraftStore } from '../profile-draft.store';
import { studentsTree } from '../../student.paths';

@Component({
  selector: 'app-create-student-page',
  imports: [StudentForm],
  templateUrl: './create-student.page.html',
})
export class CreateStudentPage {
  private studentAPI = inject(StudentService);
  private draftStore = inject(ProfileDraftStore);
  private router = inject(Router);

  userID = input.required<number>();

  serverErrors = signal<TreeValidationResult | null>(null);

  student = computed(() => this.draftStore.studentDraft());

  valueChange(data: StudentFormModel) {
    this.draftStore.studentDraft.set(data);
  }

  createStudent(data: StudentData) {
    const competencies = this.draftStore.competenciesDraft();

    const body: NewStudent = { ...data, languageCompetencies: competencies };

    this.studentAPI.CreateStudent(this.userID(), body).subscribe({
      next: (v) =>
        this.router.navigate(
          studentsTree.studentID(v.body?.student?.studentID?.toString()!).profile.view.segments,
        ),
      error(err: HttpErrorResponse) {},
    });
  }
}
