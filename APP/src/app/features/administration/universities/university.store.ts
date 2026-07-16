import { Injectable, signal } from '@angular/core';
import { UniversityDataDTO } from '../models/university.model';

@Injectable()
export class UniversityStore {
  drafts = {
    touched: signal<boolean>(false),
    universityModel: signal<UniversityDataDTO | null>(null),
  };

  selectedUniversityID = signal<number | null>(null);

  resetDrafts() {
    this.drafts.touched.set(false);
    this.drafts.universityModel.set(null);
  }
}
