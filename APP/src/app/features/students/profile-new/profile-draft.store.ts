import { Injectable, signal } from '@angular/core';
import { LanguageCompetencyData } from '../models/language-competency.model';
import { StudentFormModel } from '../models/student.model';

@Injectable()
export class ProfileDraftStore {
  studentDraft = signal<StudentFormModel | null>(null);
  competenciesDraft = signal<LanguageCompetencyData[]>([]);

  resetDrafts() {
    this.studentDraft.set(null);
    this.competenciesDraft.set([]);
  }
}
