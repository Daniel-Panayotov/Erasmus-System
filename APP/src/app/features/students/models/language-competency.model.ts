import { FileBase } from '../../../shared/models/file.model';

export enum CompetencyLevel {
  A1 = 'A1',
  A2 = 'A2',
  B1 = 'B1',
  B2 = 'B2',
  C1 = 'C1',
  C2 = 'C2',
}

export interface LanguageCompetencyData {
  language: string;
  competencyLevel: CompetencyLevel;
  canFollowLectures: boolean;
  canFollowLecturesWithLessons: boolean;
}

export interface LanguageCompetencyBase extends LanguageCompetencyData {
  languageCompetencyID: number;
}

export interface LanguageCompetency extends LanguageCompetencyBase {
  certificateBase: FileBase | null;
}

export interface LanguageCompetencyFormModel extends LanguageCompetencyData {
  certificate: File | null;
}
