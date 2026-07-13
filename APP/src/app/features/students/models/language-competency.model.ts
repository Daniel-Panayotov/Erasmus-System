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

export interface LanguageCompetencyBaseDTO {
  languageCompetencyID: number;
  dataDTO: LanguageCompetencyData;
}

export interface LanguageCompetencyTableDTO extends LanguageCompetencyData {
  languageCompetencyID: number;
  certificateUrl?: string;
}

export interface LanguageCompetencyDTO {
  certificateBase: FileBase | null;
  baseDTO: LanguageCompetencyBaseDTO;
}

export interface LanguageCompetencyFormModel extends LanguageCompetencyData {
  certificate: File | null;
}
