import { Injectable, signal } from '@angular/core';
import { LanguageCompetencyFormModel } from '../models/language-competency.model';
import { StudentFormModel } from '../models/student.model';

@Injectable()
export class ProfileDraftStore {
  touched = signal(false);
  studentDraft = signal<StudentFormModel | null>(null);
  competenciesDraft = signal<LanguageCompetencyFormModel[]>([]);

  resetDrafts() {
    this.touched.set(false);
    this.studentDraft.set(null);
    this.competenciesDraft.set([]);
  }
}
